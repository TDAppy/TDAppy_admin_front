import { NgModule } from '@angular/core';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  KeyRound,
  LucideAngularModule,
  Mail,
  User,
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({ Eye, EyeOff, KeyRound, Mail, User, ChevronRight, ChevronLeft }),
  ],
  exports: [LucideAngularModule],
})
export class IconsModule {}
