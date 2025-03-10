import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerComplementsComponent } from './burger-complements/burger-complements.component';
import { BurgerTypeComponent } from './burger-type/burger-type.component';
import { BurgersNumberComponent } from './burgers-number/burgers-number.component';
import { ButtonCalculateComponent } from './button-calculate/button-calculate.component';
import { PayTypeComponent } from './pay-type/pay-type.component';
import { TxtTotalComponent } from './txt-total/txt-total.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BurgerComplementsComponent,
    BurgerTypeComponent,
    BurgersNumberComponent,
    ButtonCalculateComponent,
    PayTypeComponent,
    TxtTotalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[
    BurgerComplementsComponent,
    BurgerTypeComponent,
    BurgersNumberComponent,
    ButtonCalculateComponent,
    PayTypeComponent,
    TxtTotalComponent,
  ]
})
export class ComponentsModule { }
