import { texts } from '../texts/texts';

const getRandomText = () => {
  const text = texts[Math.floor(Math.random() * texts.length)];
  return text.split(' ');
};

export default getRandomText;