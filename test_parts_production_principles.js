const fs = require('fs');
const path = require('path');
const vm = require('vm');

let code = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8').replace(/\ninit\(\);\s*$/, '');
code += String.raw`
(function(){
  function assert(condition, message) { if (!condition) throw new Error(message); }

  const elements = new Map();
  function elementFor(selector) {
    if (!elements.has(selector)) {
      elements.set(selector, {
        value: '',
        innerHTML: '',
        hidden: false,
        textContent: '',
        disabled: false,
        addEventListener(){},
        querySelector(){ return null; },
        querySelectorAll(){ return []; },
        classList: { add(){}, remove(){}, toggle(){} },
      });
    }
    return elements.get(selector);
  }
  document.querySelector = selector => elementFor(selector);
  document.querySelectorAll = () => [];
  document.createElement = () => ({ setAttribute(){}, appendChild(){}, addEventListener(){}, remove(){}, click(){}, style:{}, classList:{add(){},remove(){},toggle(){}} });

  const basePartsVehicle = { id: 'parts-1', stock: '12345678', batch: '12345678', order: 'ORD1', client: 'Customer One', consultant: 'Sales Person', vehicle: 'Hilux', toyotaStatus: 'Vehicle Yard Hold' };
  assert(partsDepartmentStatus(basePartsVehicle) === 'notordered', 'Parts with no order should show Not Ordered');
  assert(partsDepartmentStatus({ ...basePartsVehicle, pdcPartsOrdered: true }) === 'onorder', 'Ordered parts should show On Order');
  assert(partsDepartmentStatus({ ...basePartsVehicle, pdcCompleteParts: true }) === 'issued', 'Signed-off parts should show Issued');
  assert(partsDepartmentStatus({ ...basePartsVehicle, pdcCompleteParts: true, pdcPartsMiscAcc: true }) === 'miscacc', 'Misc Acc must override other Parts statuses');

  app.data = [basePartsVehicle];
  elementFor('#parts-search').value = 'Sales Person';
  elementFor('#parts-status-filter').value = 'all';
  assert(partsDepartmentRows().length === 0, 'Parts search must not match salesperson/staff fields');

  elementFor('#parts-search').value = '';
  renderPartsHome();
  const partsHtml = elementFor('#parts-home-content').innerHTML;
  assert(!/<th>Sales<\/th>/.test(partsHtml), 'Parts page must not render a Sales column');
  assert(!partsHtml.includes('Sales Person'), 'Parts page must not render salesperson names');

  const confirms = [];
  window.confirm = message => { confirms.push(String(message)); return true; };
  window.prompt = () => 'Parts';
  window.setInterval = () => 0;
  window.clearInterval = () => {};
  renderAll = () => {};
  populateFilters = () => {};
  window.alert = message => { throw new Error('Unexpected alert: ' + message); };
  const rftVehicle = { ...basePartsVehicle, pdcLocation: 'PMB', manualLocation: 'PMB', pmbStage: 'BUILD', pdcCompleteParts: true, pdcCompleteBuild: true };
  transferVehiclesToRft([rftVehicle], { clearSelection: false });
  assert(confirms.length === 1, 'RFT transfer should only ask for transfer confirmation');
  assert(!confirms.some(message => /sales\s*person|salesperson/i.test(message)), 'RFT transfer must not prompt for salesperson notification');

  console.log('Parts/production principle tests passed');
})();
`;

const storage = new Map();
const context = {
  console,
  window: { VEHICLE_TRACKING_DATA: { vehicles: [], toyotaMatches: {}, report: {} } },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key),
    clear: () => storage.clear(),
    key: index => Array.from(storage.keys())[index] || null,
    get length() { return storage.size; }
  },
  document: {
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    body: { classList: { add(){}, remove(){}, toggle(){} }, appendChild(){} },
    createElement: () => ({ setAttribute(){}, appendChild(){}, addEventListener(){}, remove(){}, click(){}, style:{}, classList:{add(){},remove(){},toggle(){}} })
  },
  navigator: {},
  FileReader: function(){},
  Blob: function(){},
  URL: { createObjectURL: () => 'blob:test', revokeObjectURL: () => {} },
  Intl,
  Date,
  Map,
  Set,
  JSON,
  String,
  Number,
  Boolean,
  Array,
  Object,
  RegExp,
  Math,
  Error,
  Promise,
  setTimeout,
  clearTimeout,
};
context.window.setTimeout = setTimeout;
context.window.requestAnimationFrame = fn => fn();
context.window.navigator = context.navigator;
context.globalThis = context;
vm.createContext(context);
vm.runInContext(code, context, { filename: 'app.js' });

