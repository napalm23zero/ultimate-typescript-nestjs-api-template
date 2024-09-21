export interface _GenericValidator<RequestDto> {
  validate(dto: RequestDto): void | Promise<void>
}
