module.exports = {
    "extends": "standard",
    'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow no space between function keyword and (
    'space-before-function-paren': 0
    }
};