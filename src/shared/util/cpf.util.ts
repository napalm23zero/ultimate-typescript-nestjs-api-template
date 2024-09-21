export class CpfUtil {
  /**
   * Removes all non-numeric characters from the CPF string.
   * @param cpf The raw CPF string from DTO.
   * @returns A numeric-only string.
   */
  static stripNonNumeric(cpf: string): string {
    return cpf.replace(/\D/g, '')
  }

  /**
   * Formats the CPF to the standard xxx.xxx.xxx-xx pattern.
   * @param cpf The numeric CPF string from the entity.
   * @returns A formatted CPF string.
   */
  static formatCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}
