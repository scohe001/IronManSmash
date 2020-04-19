import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterSelectionComponent } from './character-selection/character-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSortModule, MatInputModule, MatButtonModule, MatSelectModule, 
          MatBadgeModule, MatRippleModule, MatPaginatorModule, MatIconModule,
          MatPaginatorIntl, MatDatepickerModule, MatRadioModule,
          MatSidenavModule, MatToolbarModule, MatDividerModule,
          MatListModule, MatGridListModule, MatCardModule, 
          MatFormFieldModule, MatAutocompleteModule, MatTooltipModule,
          MatDialogModule, MatStepperModule, MatNativeDateModule,
          MatSnackBarModule,} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CharacterSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatBadgeModule,
    MatRippleModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDialogModule,
    MatStepperModule,
    MatNativeDateModule,
    MatSnackBarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
