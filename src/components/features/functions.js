/**
 *
 * @param  {...args} Boolean flags to calculate should button be disabled returns Boolean
 */
export const calculateDisabling = (...args) => (!args.every((arg) => arg === true));
