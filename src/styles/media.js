import { css } from 'styled-components/macro';

const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
};

const mediaQueryString = (breakpoint) => `(min-width: ${breakpoints[breakpoint]}px)`;

// Iterate through the sizes and create a media template
const media = Object.keys(breakpoints).reduce((acc, breakpoint) => {
  acc[breakpoint] = (...args) => css`
    @media ${mediaQueryString(breakpoint)} {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default media;
