import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent implements OnInit, OnDestroy, AfterViewInit {
  currentLanguage: string = 'ka';
  private subscriptions: Subscription = new Subscription();
  
  // Google Maps properties
  private map: any;
  private markers: any[] = [];
  private activeInfoWindow: any = null;
  private bounds: any;
  private locationMarkerMap = new Map();
  public isMapInitialized = false;

  @ViewChild('map', { static: false }) mapElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
        this.updateSEO();
      })
    );

    this.subscriptions.add(
      this.route.data.subscribe(data => {
        if (data) {
          this.updateSEO(data);
        }
      })
    );

    // Handle fragment navigation from footer
    this.subscriptions.add(
      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          // Wait for the map to be initialized and then handle the fragment
          setTimeout(() => {
            this.handleFragmentNavigation(fragment);
          }, 1000);
        }
      })
    );

    const urlSegments = this.router.url.split('/');
    if (urlSegments.length > 1 && ['ka', 'en', 'ru'].includes(urlSegments[1])) {
      this.languageService.setLanguage(urlSegments[1]);
    }
  }

  ngAfterViewInit(): void {
    this.loadGoogleMapsScript();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    // Clean up map resources
    if (this.map) {
      this.markers.forEach(marker => {
        if (marker && marker.map) {
          marker.map = null;
        }
      });
    }
  }

  private loadGoogleMapsScript(): void {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      this.initMap();
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0y9wta4SAyQk034aGXuawsad6Z_Rgv6g&libraries=places&v=beta`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initMap();
    };
    script.onerror = () => {
      console.error('Failed to load Google Maps script');
      this.showMapError();
    };
    document.head.appendChild(script);
  }

  private async initMap(): Promise<void> {
    try {
      if (this.isMapInitialized) return;

      // Wait for the map element to be available
      await this.waitForElement('#map');
      
      const { Map } = await window.google.maps.importLibrary("maps");
      
      this.map = new Map(document.getElementById("map"), {
        center: { lat: 41.7151, lng: 44.7271 }, // Tbilisi center
        zoom: 12,
        mapId: "RITUAL_SERVICE_MAP",
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      });
      
      this.bounds = new window.google.maps.LatLngBounds();
      
      await this.addLocationMarkers();
      this.addMyLocationButton();
      
      this.isMapInitialized = true;
    } catch (error) {
      console.error("Error initializing map:", error);
      this.showMapError();
    }
  }

  private async addLocationMarkers(): Promise<void> {
    try {
      const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker");
      const { Geocoder } = await window.google.maps.importLibrary("geocoding");
      
      // Clear existing markers
      this.markers.forEach(marker => marker.map = null);
      this.markers = [];
      this.locationMarkerMap.clear();
      
      // Simple approach: wait a bit for DOM to be ready, then get location items
      await new Promise(resolve => setTimeout(resolve, 500));
      let locationItems = document.querySelectorAll('.location-list .location-item');
      
      const pinColors = ["#5184ed", "#d14646", "#35b34a"];
      
      for (let i = 0; i < locationItems.length; i++) {
        const item = locationItems[i] as HTMLElement;
        let position;
        
        if (item.dataset['lat'] && item.dataset['lng']) {
          position = { 
            ['lat']: parseFloat(item.dataset['lat']), 
            ['lng']: parseFloat(item.dataset['lng']) 
          };
        } else {
          console.warn("No location data for item:", item);
          continue;
        }
        
        const pin = new PinElement({
          background: pinColors[i % pinColors.length],
          borderColor: "#fff",
          glyphColor: "#fff",
          scale: 1.2,
        });
        
        const lat = position['lat'];
        const lng = position['lng'];
        
        const infoWindowContent = `
          <div style="padding: 8px; max-width: 200px; font-size: 12px;">
            <h3 style="margin: 0 0 4px 0; color: #444; font-size: 14px; font-weight: 600;">${item.textContent}</h3>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #666;">Ritual Service</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
              <a href="tel:+995599069898" style="color: #5184ed; display: flex; align-items: center; text-decoration: none; font-size: 11px;">
                <i class="fa-solid fa-phone" style="margin-right: 4px;"></i>+995 599 06 98 98
              </a>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" 
                 target="_blank" 
                 style="color: #5184ed; display: flex; align-items: center; text-decoration: none; font-size: 16px; margin-left: 8px;">
                <i class="fa-solid fa-directions"></i>
              </a>
            </div>
          </div>
        `;
        
        const infoWindow = new window.google.maps.InfoWindow({
          content: infoWindowContent,
          ariaLabel: item.textContent,
        });
        
        const marker = new AdvancedMarkerElement({
          map: this.map,
          position: position,
          title: item.textContent,
          content: pin.element,
        });
        
        marker.addListener("gmp-click", () => {
          if (this.activeInfoWindow) {
            this.activeInfoWindow.close();
          }
          
          infoWindow.open(this.map, marker);
          this.activeInfoWindow = infoWindow;
          
          this.map.panTo(position);
          this.highlightLocationItem(item);
        });
        
        this.markers.push(marker);
        this.locationMarkerMap.set(item, marker);
        
        // Set up click handler for this specific item
        this.setupLocationItemHandler(item);
        
        this.bounds.extend({['lat']: lat, ['lng']: lng});
      }
      
      if (this.markers.length > 0) {
        this.map.fitBounds(this.bounds);
        
        if (this.markers.length === 1) {
          this.map.setZoom(15);
        }
      }
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  }

  private setupLocationItemHandler(item: HTMLElement): void {
    item.addEventListener('click', () => {
      const marker = this.locationMarkerMap.get(item);
      
      if (marker) {
        const position = marker.position;
        
        this.map.panTo(position);
        this.map.setZoom(16);
        
        if (this.activeInfoWindow) {
          this.activeInfoWindow.close();
        }
        
        window.google.maps.event.trigger(marker, 'click');
        this.highlightLocationItem(item);
        
        // Scroll to map on mobile devices
        this.scrollToMap();
      }
    });
  }

  private scrollToMap(): void {
    // Check if we're on mobile (screen width <= 768px)
    if (window.innerWidth <= 768) {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        // Get header height to account for fixed positioning
        const header = document.querySelector('header') || document.querySelector('.header') || document.querySelector('#header');
        const headerHeight = header ? header.offsetHeight : 80; // Default fallback height
        
        // Calculate the target scroll position with header offset
        const mapRect = mapElement.getBoundingClientRect();
        const targetScrollTop = window.pageYOffset + mapRect.top - headerHeight - 20; // 20px extra padding
        
        window.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
    }
  }

  private highlightLocationItem(activeItem: HTMLElement): void {
    document.querySelectorAll('.location-item').forEach(item => {
      item.classList.remove('active');
    });
    
    activeItem.classList.add('active');
  }

  private handleFragmentNavigation(fragment: string): void {
    // Find the location item with matching data-key
    const locationItem = document.querySelector(`.location-item[data-key="${fragment}"]`) as HTMLElement;
    
    if (locationItem) {
      // Highlight the location item immediately
      this.highlightLocationItem(locationItem);
      
      // If map is not ready yet, wait for it
      if (!this.map || !this.isMapInitialized) {
        // Wait for map to be ready and try again
        setTimeout(() => {
          this.handleFragmentNavigation(fragment);
        }, 500);
        return;
      }
      
      // Get the marker for this location
      const marker = this.locationMarkerMap.get(locationItem);
      
      if (marker) {
        const position = marker.position;
        
        // Pan to the location and zoom in
        this.map.panTo(position);
        this.map.setZoom(16);
        
        // Close any existing info window
        if (this.activeInfoWindow) {
          this.activeInfoWindow.close();
        }
        
        // Trigger the marker click to show info window
        window.google.maps.event.trigger(marker, 'click');
        
        // Scroll to map on mobile devices
        this.scrollToMap();
      } else {
        // If marker is not found, try again after a short delay
        setTimeout(() => {
          this.handleFragmentNavigation(fragment);
        }, 200);
      }
    }
  }

  private addMyLocationButton(): void {
    const locationButton = document.createElement("div");
    locationButton.classList.add("custom-map-control");
    locationButton.title = "Show my location";
    
    const locationIcon = document.createElement("i");
    locationIcon.className = "fa-solid fa-location-crosshairs";
    locationButton.appendChild(locationIcon);
    
    this.map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
    
    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              ['lat']: position.coords.latitude,
              ['lng']: position.coords.longitude,
            };
            
            this.map.setCenter(pos);
            this.map.setZoom(15);
            
            this.showToast("თქვენი მდებარეობა ნაპოვნია");
          },
          () => {
            this.showToast("მდებარეობის განსაზღვრა ვერ მოხერხდა", true);
          }
        );
      } else {
        this.showToast("თქვენს ბრაუზერში მდებარეობის განსაზღვრა არ არის მხარდაჭერილი", true);
      }
    });
  }

  private showToast(message: string, isError: boolean = false): void {
    let toast = document.getElementById("map-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "map-toast";
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.backgroundColor = isError ? "#d32f2f" : "#4caf50";
    toast.style.color = "#fff";
    toast.style.opacity = "1";
    
    setTimeout(() => {
      toast.style.opacity = "0";
    }, 3000);
  }

  private showMapError(): void {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.innerHTML = "<p style='padding: 20px; text-align: center; color: #666;'>Map could not be loaded. Please refresh and try again.</p>";
    }
  }

  private waitForElement(selector: string): Promise<Element> {
    return new Promise((resolve) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else {
        const observer = new MutationObserver(() => {
          const element = document.querySelector(selector);
          if (element) {
            observer.disconnect();
            resolve(element);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    });
  }



  private updateSEO(routeData?: any): void {
    const seoData = routeData || {
      title: 'ფილიალები - თბილისის ფილიალები | რიტუალ სერვისი - damkrdzalavi biuro',
      description: 'რიტუალ სერვისის ფილიალები თბილისში: გლდანი, დიღომი, ჯიქია. ადვილად მისაწვდომი ლოკაციები. damkrdzalavi biuro',
      keywords: 'ფილიალები, თბილისის ფილიალები, გლდანი, დიღომი, ჯიქია, damkrdzalavi biuro ადგილმდებარეობა'
    };

    this.seoService.updateSEO(seoData, this.currentLanguage);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  callPhone(): void {
    window.location.href = 'tel:+995599069898';
  }
}