import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routes.module';
import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// Shared Components
import { ServiceCardComponent } from './shared/components/service-card/service-card.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { SwiperComponent } from './shared/components/swiper/swiper.component';
import { MapComponent } from './shared/components/map/map.component';
import { ContactFormComponent } from './shared/components/contact-form/contact-form.component';

// Services
import { SeoService } from './services/seo.service';
import { LanguageService } from './services/language.service';
import { MapService } from './services/map.service';

// Pipes
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    
    // Shared Components
    HeaderComponent,
    FooterComponent,
    LanguageSelectorComponent,
    ServiceCardComponent,
    ProductCardComponent,
    BreadcrumbComponent,
    SwiperComponent,
    MapComponent,
    ContactFormComponent,
    
    // Pages
    HomeComponent,
    ServicesComponent,
    ServiceDetailComponent,
    ProductsComponent,
    ProductDetailComponent,
    AboutComponent,
    ContactComponent,
    LocationsComponent,
    NotFoundComponent,
    
    // Pipes
    TranslatePipe,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    SeoService,
    LanguageService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }