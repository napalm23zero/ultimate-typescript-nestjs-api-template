import { applyDecorators, Type } from '@nestjs/common'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

export function _GenericApiDecorators(requestDtoClass: Type<any>, responseDtoClass: Type<any>) {
  return applyDecorators(
    ApiBody({ type: requestDtoClass }),
    ApiResponse({
      status: 201,
      description: 'The entity has been successfully created.',
      type: responseDtoClass,
    }),
    ApiResponse({
      status: 200,
      description: 'Entity found.',
      type: responseDtoClass,
    }),
    ApiResponse({
      status: 200,
      description: 'List of all entities.',
      type: responseDtoClass,
      isArray: true,
    }),
    ApiResponse({
      status: 200,
      description: 'The entity has been successfully updated.',
      type: responseDtoClass,
    }),
    ApiResponse({
      status: 204,
      description: 'The entity has been successfully deleted.',
    }),
    ApiResponse({ status: 404, description: 'Entity not found.' })
  )
}
