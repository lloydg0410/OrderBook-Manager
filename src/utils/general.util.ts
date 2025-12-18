export class GeneralUtils {
  static async sleep(milliseconds: number) {
    if (milliseconds <= 0)
      return;
    return new Promise((res) => {
      setTimeout(() => {
        res(1);
      }, milliseconds);
    });
  }
}