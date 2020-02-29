import * as React from 'react';
import { ButtonFocusTest } from './Button';
import { CalloutTest } from './Callout';
import { PressableTest } from './Pressable';
import { LinkTest } from './Link';
import { SeparatorTest } from './Separator';
import { ThemeTest } from './Theme';
import { FocusTrapTest } from './FocusTrapZone';
import { PersonaCoinTest } from './PersonaCoin/PersonaCoinTest';
import { PersonaTest } from './Persona/PersonaTest';

export type TestDescription = {
  name: string;
  component: React.FunctionComponent<{}>;
};

export const allTestComponents: TestDescription[] = [
  {
    name: 'Button Test',
    component: ButtonFocusTest
  },
  {
    name: 'Callout Test',
    component: CalloutTest
  },
  {
    name: 'Focus Trap Zone Test',
    component: FocusTrapTest
  },
  {
    name: 'Pressable Test',
    component: PressableTest
  },
  {
    name: 'Link Test',
    component: LinkTest
  },
  {
    name: 'Separator Test',
    component: SeparatorTest
  },
  {
    name: 'Theme Test',
    component: ThemeTest
  },
  {
    name: 'PersonaCoin Test',
    component: PersonaCoinTest
  },
  {
    name: 'Persona Test',
    component: PersonaTest
  }
];
