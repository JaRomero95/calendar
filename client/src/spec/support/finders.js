function callChildProp(wrapper, component, prop, ...event) {
  getChildProp(wrapper, component, prop)(...event);
}

function getChildProp(wrapper, component, prop) {
  const selector = typeof component === 'string' ? component : component.displayName || component;

  return wrapper.find(selector).props()[prop];
}

export {
  getChildProp,
  callChildProp,
};
