export * from './Card';
export * from './Deck';
export * from './Player';
export * from './Room';

export enum SuiteColors {
  WHITE = 'white',
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow'
}

export function getSuiteFromColor(color: string) {
  color = color.toLowerCase();

  switch (color) {
    case 'white':
      return SuiteColors.WHITE;
      break;
    case 'red':
      return SuiteColors.RED;
      break;
    case 'blue':
      return SuiteColors.BLUE;
      break;
    case 'green':
      return SuiteColors.GREEN;
      break;
    case 'yellow':
      return SuiteColors.YELLOW;
      break;
    default:
      throw new Error(`Invalid color: ${color}`);
  }
}
