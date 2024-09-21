export class CnpjUtil {
  /**
   * Removes all non-numeric characters from the CNPJ string.
   * @param cnpj The raw CNPJ string from DTO.
   * @returns A numeric-only string.
   */
  static stripNonNumeric(cnpj: string): string {
    return cnpj.replace(/\D/g, '')
  }

  /**
   * Formats the CNPJ to the standard xx.xxx.xxx/xxxx-xx pattern.
   * @param cnpj The numeric CNPJ string from the entity.
   * @returns A formatted CNPJ string.
   */
  static formatCnpj(cnpj: string): string {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
}
