//Collabs: Antonio Ji, David Lym
import { List, nil, equal ,cons, rev, len} from './list';
import { Color } from './color';

/**
 * Returns the list of colors shown in the each of the odd rows (first,
 * third, fifth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return take(colors), i.e., every other color starting from the first
 */
export const weaveWarpFacedOdds = (colors: List<Color>): List<Color> => {
  // TODO(6c): detect and handle odd length lists here


  if (len(colors) % 2 !== 0 && colors !== nil){
    return cons(colors.hd, weaveWarpFacedEvens(colors.tl));
  }

  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: TODO(6a): add this
  // Inv: L = concat(rev(R), S), T = Take(S)
  while (R !== nil && R.tl !== nil) {
    // TODO(6b): implement this
    S = cons(R.hd, S);
    R = R.tl;
    T = cons(R.hd, T);
    S = cons(R.hd, S);
    R = R.tl;
    //break;  // TODO(6b): remove
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R === nil) {
    return T;  // We have S = colors, so T = take(S) = take(colors).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};

/**
 * Returns the list of colors shown in the each of the even rows (second,
 * fourth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return skip(colors), i.e., every other color starting from the second
 */
export const weaveWarpFacedEvens = (colors: List<Color>): List<Color> => {
  // TODO(6c): detect and handle odd length lists here
  if(len(colors) % 2 !== 0 && colors !== nil){
    return weaveWarpFacedOdds(colors.tl);
  }

  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: TODO(6a): add this
  // Inv: L = concat(rev(R), S), T = Skip(S)
  while (R !== nil && R.tl !== nil) {
    // TODO(6b): implement this
    S = cons(R.hd, S);
    T = cons(R.hd, T);
    R = R.tl;
    S = cons(R.hd, S);
    R = R.tl;
    //break;  // TODO(6b): remove
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R === nil) {
    return T;  // We have S = colors, so T = skip(S) = skip(colors).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};

/**
 * Returns the list of colors shown in the each of the odd rows (first, third,
 * fifth, etc.) by a balanced weave with the given warp and weft colors.
 * @param list of all the (warp) colors in the weave
 * @param c (weft) color to replace with
 * @return leave(colors, c)
 */
export const weaveBalancedOdds =
    (colors: List<Color>, c: Color): List<Color> => {
  // TODO(6f): detect and handle odd length lists here

  if(len(colors) % 2 !== 0 && colors !== nil){
    return cons(colors.hd, weaveBalancedEvens(colors.tl, c));
  }

  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: TODO(6d): add this
  // Inv: L = concat(rev(R), S), T = Leave(S, c)
  while (R !== nil && R.tl !== nil) {
    // TODO(6e): implement this
    S = cons(R.hd, S);
    T = cons(c, T);
    R = R.tl;
    S = cons(R.hd, S);
    T = cons(R.hd, T);
    R = R.tl;
    //break;  // TODO(6e): remove
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R === nil) {
    return T;  // We have S = colors, so T = leave(S, c) = leave(colors, c).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};

/**
 * Returns the list of colors shown in the each of the even rows (second,
 * fourth, etc.) by a balanced weave with the given warp and weft colors.
 * @param list of all the (warp) colors in the weave
 * @param c (weft) color to replace with
 * @return replace(colors, c)
 */
export const weaveBalancedEvens =
    (colors: List<Color>, c: Color): List<Color> => {
  // TODO(6f): detect and handle odd length lists here
  if(len(colors) % 2 !== 0 && colors !== nil){
    return cons(c, weaveBalancedOdds(colors.tl, c));
  }

  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: TODO(6d): add this
  // Inv: L = concat(rev(R), S), T = replace(S, c);
  while (R !== nil && R.tl !== nil) {
    // TODO(6e): implement this
    S = cons(R.hd, S);
    T = cons(R.hd, T);
    R = R.tl;
    S = cons(R.hd, S);
    T = cons(c, T);
    R = R.tl;
    //break;  // TODO(6e): remove
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R === nil) {
    return T;  // We have S = colors, so T = replace(S, c) = replace(colors, c)
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};

/**
 * Returns the given number of rows of a weave with the given colors
 * @param rows the (natural) number of rows in the weave
 * @param colors the weft colors in each row
 * @returns list of the given length where the odd values are the colors of
 *      weaveWarpFacedOdds and the even values are the colors of
 *      weaveWarpFacedEvens.
 * @returns the function defined recursively (on rows) by
 *   - weaveWarpFaced(0, colors) = nil
 *   - weaveWarpFaced(1, colors) = cons(weaveWarpFacedEvens(colors), nil)
 *   - weaveWarpFaced(n+2, colors) =
 *         cons(weaveWarpFacedEvens(colors),
 *             cons(weaveWarpFacedOdds(colors), weaveWarpFaced(n, colors)))
 */
export const weaveWarpFaced =
    (rows: number, colors: List<Color>): List<List<Color>> => {
  // TODO: implement this with a while loop as described in 7a
  // Be sure to document your loop invariant with an Inv comment above the loop
  // return cons(weaveWarpFacedEvens(colors),
  //     cons(weaveWarpFacedOdds(colors), nil));
  if(rows<0){
    throw new Error("Row is negative");
  }
  const d: number = rows % 2;
  let m: number = rows;
  let S: List<List<Color>> = nil;
  const odds: List<Color> = weaveWarpFacedOdds(colors);
  const even: List<Color> = weaveWarpFacedEvens(colors);

  if(d === 1){
    S = cons(even, S)
  }
  // Inv: S0 = cons(evens, cons(odds, S));
  while (m >= 2){
    S = cons(even, cons(odds, S))
    m -= 2;
  }
  return S;
};

/**
 * Returns the given number of rows of a balanced weave with the given colors
 * @param rows the (natural) number of rows in the weave
 * @param colors the warp colors in each row
 * @param c the weft color
 * @returns the function defined recursively (on rows) by
 *   - weaveBalanced(0, colors, c) = nil
 *   - weaveBalanced(1, colors, c) = cons(weaveBalancedEvens(colors, c), nil)
 *   - weaveBalanced(n+2, colors) =
 *         cons(weaveBalancedEvens(colors, c),
 *             cons(weaveBalancedOdds(colors, c), weaveBalanced(n, colors, c)))
 */
export const weaveBalanced =
    (rows: number, colors: List<Color>, c: Color): List<List<Color>> => {
  // TODO: implement this with a while loop as described in 7b
  // Be sure to document your loop invariant with an Inv comment above the loop
  // return cons(weaveBalancedEvens(colors, c),
  //     cons(weaveBalancedOdds(colors, c), nil));
  if (rows < 0) {  // defensive programming
    throw new Error("rows cannot be negative");
  }

  const d: number = rows % 2
  let m: number = rows
  let S: List<List<Color>> = nil
  let odds: List<Color> = weaveBalancedOdds(colors, c)
  let even: List<Color> = weaveBalancedEvens(colors, c)

  if (d === 1) {
    S = cons(even, S)
  }
  // Inv: S0 = cons(evens, cons(odds, S));
  while (m >= 2) {
    S = cons(even, cons(odds, S))
    m -= 2;
  }

  return S;

};
