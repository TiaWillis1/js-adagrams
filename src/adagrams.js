const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

const SCORE_CHART = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  L: 1,
  N: 1,
  R: 1,
  S: 1,
  T: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10,
};

export const drawLetters = () => {
  // Implement this method for wave 1
  let letterQty = [];

  for (let letter in LETTER_POOL) {
    for (let i = 0; i < LETTER_POOL[letter]; i++) {
      letterQty.push(letter);
    }
  }
  let shuffled = letterQty.slice(0);
  let i = letterQty.length;
  let temp;
  let index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, 10);
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2

  const input1 = input.toUpperCase();

  for (const letter of input1) {
    const includesLetter = lettersInHand.includes(letter);
    const inputCount = [...input1].filter((x) => x == letter).length;
    const lettersInHandCount = lettersInHand.filter((x) => x == letter).length;
    if (!includesLetter || inputCount > lettersInHandCount) {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  const word1 = word.toUpperCase();
  let totalScore = 0;
  let scoredLetter = 0;

  for (let letter of word1) {
    scoredLetter = SCORE_CHART[letter];
    totalScore += scoredLetter;
  }

  if (word1.length >= 7) {
    totalScore += 8;
  }
  return totalScore;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let scoredWords = {};

  for (let word of words) {
    let scoreCalculator = scoreWord(word);
    scoredWords[word] = scoreCalculator;
  }

  let winner = { word: "", score: 0 };
  let hList = [];
  let hValue = 0;
  for (let w in scoredWords) {
    if (scoredWords[w] > hValue) {
      hValue = scoredWords[w];
      hList = [w];
    } else if (scoredWords[w] == hValue) {
      hList.push(w);
    }
  }
  if (hList.length === 1) {
    winner = { word: hList[0], score: scoredWords[hList[0]] };
  } else if (hList.length > 1) {
    let maxx = hList.reduce((a, b) => {
      return a.length > b.length ? a : b;
    });
    let minn = hList.reduce((a, b) => {
      return a.length < b.length ? a : b;
    });

    if (hList[0].length === hList[1].length) {
      winner = { word: hList[0], score: scoredWords[hList[0]] };
    } else if (maxx.length > 9) {
      winner = { word: maxx, score: scoredWords[maxx] };
    } else if (maxx.length < 9) {
      winner = { word: minn, score: scoredWords[minn] };
    }
  }
  return winner;
};
