import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  pure: false // Make it impure to update on language changes
})
export class TranslatePipe implements PipeTransform {

  constructor(private languageService: LanguageService) {}

  transform(key: string, params?: { [key: string]: string }): string {
    return this.languageService.translate(key, params);
  }
}