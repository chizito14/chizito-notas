imports: [
    FormsModule,
    ReactiveFormsModule,
  ],

private fb = inject(FormBuilder)

  public loginForm: FormGroup<LoginForm> = this.fb.group<LoginForm>({
    email: new FormControl('gojo@gmail.com', { validators: [Validators.required] }),
    password: new FormControl('12345678', { validators: [Validators.required] }),
  })