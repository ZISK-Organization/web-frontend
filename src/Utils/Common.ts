export const scrollToRefObject = (ref: any) => window.scrollTo(0, ref.current.offsetTop); //TODO ref type

export const round = (x: number, dec: number) => Math.round(x * Math.pow(10, dec)) / Math.pow(10, dec);

export const cutString = (str: string, maxLength: number) =>
  str.length > maxLength + 4 ? str.substring(0, maxLength) + " ..." : str;

export const separateThousands = (x: string | number | undefined) =>
  x === undefined ? "" : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
