import { configureDynamicStore } from '@james_c/react-rtkq';
import { staticSlice } from './staticSlice';

export const { store, createDynamicSlice, useStaticSelector } =
  configureDynamicStore({
    staticSlices: [staticSlice],
  });
