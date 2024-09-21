export class PhoneUtil {
  /**
   * Removes all characters except numbers and the plus sign from the phone number.
   * @param phone The raw phone number string from DTO.
   * @returns A string with only numbers and the plus sign.
   */
  static stripNonNumeric(phone: string): string {
    return phone.replace(/[^\d+]/g, '')
  }

  /**
   * Formats the phone number to the international E.164 pattern +XX (XX) XXXXX-XXXX.
   * @param phone The numeric phone string from the entity.
   * @returns A formatted phone number string.
   */
  static formatInternationalPhone(phone: string): string {
    return phone.replace(/(\+\d{2})(\d{2})(\d{5})(\d{4})/, '$1 ($2) $3-$4')
  }
}
