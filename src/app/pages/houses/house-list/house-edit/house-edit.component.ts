import { ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, combineLatest, Subscription } from 'rxjs';
import { SubSink } from 'subsink';
import { House } from '../../house.model';
import { HouseService } from '../../house.service';


interface HouseFormControls {
  url: FormControl<string|null>,
  name: FormControl<string|null>,
  address: FormControl<string|null>,
  costPerMonth: FormControl<number|null>,
  deposit: FormControl<number|null>,
  mq: FormControl<number|null>
}

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrls: ['./house-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseEditComponent implements OnInit, OnDestroy {
  private subs = new SubSink()
  editForm!: FormGroup<HouseFormControls>;
  house$: Observable<House>;

  constructor(
    private router: Router,
    route: ActivatedRoute,
    private houseService: HouseService
  ) {
    this.house$ = combineLatest([houseService.houses$, route.paramMap])
      .pipe(
        map(([houses, paramMap]) => {
          debugger
          console.log(houses[filterInt(paramMap.get('id') as string)])
          const house = houses[filterInt(paramMap.get('id') as string)]
          if (!house) this.router.navigate(['/not-found'])
          return house
        })
      )

    this.setupForm()
    this.subs.add(this.house$.subscribe(house => {
      this.setForm(house)
    }))
  }

  ngOnInit() {
  }

  save() {

  }

  /**
   *
   */
  download() {
    console.log(`Download: ${this.editForm.controls.url.value}`)

    if (this.editForm.controls.url.valid && this.editForm.controls.url.value){
      const subscription = this.houseService.fetch(this.editForm.controls.url.value as string)
        .subscribe((val: House) => {
          this.setForm(val)
          subscription.unsubscribe()
        })
      }
  }

  close() {
    this.router.navigate(['/'])
  }

  setupForm() {
    this.editForm = new FormGroup<HouseFormControls>({
      'url': new FormControl('', [
        Validators.required,
        this.validateUrl.bind(this)
      ]),
      'name': new FormControl('', [
        Validators.required
      ]),
      'address': new FormControl('', [
        Validators.required
      ]),
      'costPerMonth': new FormControl(0, [
        Validators.required,
      ]),
      'deposit': new FormControl(0, [
        Validators.required,
      ]),
      'mq': new FormControl(0, [
        Validators.required
      ])
    })
  }

  setForm(house: House = {
    url: '',
    name: '',
    address: '',
    costPerMonth: 0,
    deposit: 0,
    mq: 0,
    dateCreated: new Date()
  }) {
    this.editForm.controls.url.setValue(house.url)
    this.editForm.controls.name.setValue(house.name)
    this.editForm.controls.address.setValue(house.address)
    this.editForm.controls.costPerMonth.setValue(house.costPerMonth)
    this.editForm.controls.deposit.setValue(house.deposit)
    this.editForm.controls.mq.setValue(house.mq)
  }

  validateUrl(control: FormControl): {[s: string]: boolean} | null {
    //source regex: https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
    const rCheck = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    if(!rCheck.test(control.value)) {
      return {'urlIsInvalid': false}
    }
    return null
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}

//used to filter id cause parseInt turns strings like "12d.af-1" in 12
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#a_stricter_parse_function
function filterInt(value: string) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
}
