import { grey } from '@mui/material/colors';
import createPalette from '@mui/material/styles/createPalette';
import { loadImage, prepareIcon } from './mapUtil';

import arrowSvg from '../../resources/images/arrow.svg';
import directionSvg from '../../resources/images/direction.svg';
import backgroundSvg from '../../resources/images/background.svg';
import animalSvg from '../../resources/images/icon/animal.svg';
import bicycleSvg from '../../resources/images/icon/bicycle.svg';
import boatPNG from '../../resources/images/icon/boat.png';
import busPNG from '../../resources/images/icon/bus.png';
import carPNG from '../../resources/images/icon/car.png';
import camperPNG from '../../resources/images/icon/van.png';
import cranePNG from '../../resources/images/icon/crane.png';
import defaultSvg from '../../resources/images/icon/default.svg';
import helicopterPNG from '../../resources/images/icon/helicopter.png';
import motorcyclePNG from '../../resources/images/icon/motorcycle.png';
import trailer from '../../resources/images/icon/trailer.png';
import personSvg from '../../resources/images/icon/person.svg';
import pickupPNG from '../../resources/images/icon/pickup.png';
import planeSvg from '../../resources/images/icon/plane.svg';
import scooterSvg from '../../resources/images/icon/scooter.svg';
import shipSvg from '../../resources/images/icon/ship.svg';
import tractorPNG from '../../resources/images/icon/tractor.png';
import trainSvg from '../../resources/images/icon/train.svg';
import tramSvg from '../../resources/images/icon/tram.svg';
import trolleybusSvg from '../../resources/images/icon/trolleybus.svg';
import truckPNG from '../../resources/images/icon/truck.png';
import vanPNG from '../../resources/images/icon/van.png';
import cajaPNG from '../../resources/images/icon/caja.png';

export const mapIcons = {
  animal: animalSvg,
  bicycle: bicycleSvg,
  boat: boatPNG,
  bus: busPNG,
  car: carPNG,
  camper: camperPNG,
  crane: cranePNG,
  default: defaultSvg,
  helicopter: helicopterPNG,
  motorcycle: motorcyclePNG,
  offroad: trailer,
  person: personSvg,
  pickup: pickupPNG,
  plane: planeSvg,
  scooter: scooterSvg,
  ship: shipSvg,
  tractor: tractorPNG,
  train: trainSvg,
  tram: tramSvg,
  trolleybus: trolleybusSvg,
  truck: truckPNG,
  van: vanPNG,
  caja: cajaPNG,
};

export const mapIconKey = (category) => (mapIcons.hasOwnProperty(category) ? category : 'default');

export const mapImages = {};

const mapPalette = createPalette({
  neutral: { main: grey[500] },
});

// Función para detectar si el archivo es PNG
const isPng = (file) => file.endsWith('.png');

const resizeImage = (image) => {
  return new Promise((resolve) => {
    const maxSize = 100;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let width = image.width;
    let height = image.height;
    if (width > maxSize || height > maxSize) {
      const scale = Math.min(maxSize / width, maxSize / height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    const resizedImage = new Image();
    resizedImage.src = canvas.toDataURL();
    resizedImage.onload = () => resolve(resizedImage);
  });
};

export default async () => {
  const background = await loadImage(backgroundSvg);
  mapImages.background = await prepareIcon(background);
  mapImages.direction = await prepareIcon(await loadImage(directionSvg));
  mapImages.arrow = await prepareIcon(await loadImage(arrowSvg));

  await Promise.all(
    Object.keys(mapIcons).map(async (category) => {
      const iconPath = mapIcons[category];
      const results = [];

      ['info', 'success', 'error', 'neutral'].forEach((color) => {
        results.push(
          loadImage(iconPath).then(async (icon) => {
            if (isPng(iconPath)) {
              const resizedIcon = await resizeImage(icon);
              mapImages[`${category}-${color}`] = resizedIcon;
            } else {
              mapImages[`${category}-${color}`] = prepareIcon(background, icon, mapPalette[color].main);
            }
          })
        );
      });

      await Promise.all(results);
    })
  );
};
