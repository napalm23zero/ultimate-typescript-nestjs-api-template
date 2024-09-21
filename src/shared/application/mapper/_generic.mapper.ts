export interface _GenericMapper<Entity, RequestDto, ResponseDto> {
  toEntity(dto: RequestDto): Promise<Entity>
  toResponseDto(entity: Entity): ResponseDto
}
