import {LinearScheduler} from './LinearScheduler';

// taken from https://stackoverflow.com/a/2450976
const shuffle = array => {
  const shuffledArray = array.slice();
  let currentIndex = shuffledArray.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
};

export class RandomScheduler extends LinearScheduler {
  constructor({items = [], startIndex = 0, ...restParams}) {
    const shuffledItems = shuffle(items);
    super({items: shuffledItems, ...restParams});

    // move to a function and call straight in ctor initializer
    // let itemsFinal = [];

    // if (items.length > 0) {
    //   const [firstItem, ...restItem] = items;
    //   itemsFinal = [firstItem, ...shuffle(restItem)];
    // }
  }
}
