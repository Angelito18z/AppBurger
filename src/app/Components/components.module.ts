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

import { JoinExtrasPipe } from '../join-extras.pipe';
import { PaypalComponent } from './paypal/paypal.component';

@NgModule({
  declarations: [
    BurgerComplementsComponent,
    BurgerTypeComponent,
    BurgersNumberComponent,
    ButtonCalculateComponent,
    PayTypeComponent,
    TxtTotalComponent,
    PaypalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    JoinExtrasPipe
  ],
  exports:[
    BurgerComplementsComponent,
    BurgerTypeComponent,
    BurgersNumberComponent,
    ButtonCalculateComponent,
    PayTypeComponent,
    TxtTotalComponent,
    PaypalComponent
  ]
})
export class ComponentsModule { }
