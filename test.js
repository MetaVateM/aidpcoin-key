const AidpcoinKey = require("./dist/main");

test("Random mnemonic should contain 12 words", () => {
  const mnemonic = AidpcoinKey.generateMnemonic();
  expect(mnemonic.split(" ").length).toBe(12);
});

test("Validate address on main-net", () => {
  const network = "aidp";
  const mnemonic =
    "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
  const address = AidpcoinKey.getAddressPair(network, mnemonic, 0, 1);
  expect(address.external.address).toBe("RKbP9SMo2KTKWsiTrEDhTWPuaTwfuPiN8G");
});

test("Validate address on test-net", () => {
  const network = "aidp-test";
  const mnemonic =
    "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
  const address = AidpcoinKey.getAddressPair(network, mnemonic, 0, 1);
  expect(address.external.address).toBe("n1nUspcdAaDAMfx2ksZJ5cDa7UKVEGstrX");
});

test("Validate Wallet Import Format (WIF) main-net ", () => {
  const network = "aidp";
  const mnemonic =
    "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
  const address = AidpcoinKey.getAddressPair(network, mnemonic, 0, 1);

  expect(address.internal.address).toBe("RLnvUoy29k3QiQgtR6PL416rSNfHTuwhyU");
  expect(address.external.WIF).toBe(
    "KyWuYcev1hJ7YJZTjWx8coXNRm4jRbMEhgVVVC8vDcTaKRCMASUE"
  );
});

test("Validate Wallet Import Format (WIF) test-net ", () => {
  const network = "aidp-test";
  const mnemonic =
    "orphan resemble brain dwarf bus fancy horn among cricket logic duty crater";
  const address = AidpcoinKey.getAddressPair(network, mnemonic, 0, 1);

  expect(address.external.WIF).toBe(
    "cPchRRmzZXtPeFLHfrh8qcwaRaziJCS4gcAMBVVQh1EiehNyBtKB"
  );
});

test("Validate get public address from Wallet Import Format (WIF) main-net ", () => {
  const network = "aidp";
  const WIF = "KyWuYcev1hJ7YJZTjWx8coXNRm4jRbMEhgVVVC8vDcTaKRCMASUE";
  const addressObject = AidpcoinKey.getAddressByWIF(network, WIF);

  expect(addressObject.address).toBe("RKbP9SMo2KTKWsiTrEDhTWPuaTwfuPiN8G");
});

test("Valid bytes to mnemonic", () => {
  const hexString = "a10a95fb55808c5f15dc97ecbcd26cf0";
  const bytes = Uint8Array.from(Buffer.from(hexString, "hex"));
  const mnemonic = AidpcoinKey.entropyToMnemonic(bytes);
  expect(mnemonic).toBe(
    "patient feed learn prison angle convince first napkin uncover track open theory"
  );
});

test("Non valid bytes to mnemonic should fail", () => {
  const hexString = "a10a94fb55808c5f15dc97ecbcd26cf0";
  const bytes = Uint8Array.from(Buffer.from(hexString, "hex"));
  const mnemonic = AidpcoinKey.entropyToMnemonic(bytes);
  expect(mnemonic).not.toBe(
    "patient feed learn prison angle convince first napkin uncover track open theory"
  );
});

describe("Validate diff languages", () => {
  it("Should accept spanish mnemonic", () => {
    const m =
      "velero nuera pepino reír barro reforma negar rumbo atento separar pesa puma";
    const valid = AidpcoinKey.isMnemonicValid(m);
    expect(valid).toBe(true);
  });

  it("Should accept French mnemonic", () => {
    const m =
      "vaseux mixte ozone quiétude besogne punaise membre réussir avarice samedi pantalon poney";
    const valid = AidpcoinKey.isMnemonicValid(m);
    expect(valid).toBe(true);
  });
});

it("Should accept Italian mnemonic", () => {
  const m =
    "veloce perforare recinto sciroppo bici scelto parabola sguardo avanzato sonnifero remoto rustico";
  const valid = AidpcoinKey.isMnemonicValid(m);
  expect(valid).toBe(true);
});

describe("generateAddress", () => {
  it("should generate an address with a mnemonic", () => {
    // Call the function
    const result = AidpcoinKey.generateAddressObject();

    // Assertions
    expect(result).toHaveProperty("mnemonic");
    expect(result.mnemonic).toBeDefined();
    expect(result.network).toBe("aidp"); //Test default
    expect(result).toHaveProperty("address"); // replace 'key' with the actual property you expect in addressObject
    // ... you can add more assertions based on the expected structure of the result
  });

  it("default network should be aidp for Aidpcoin", () => {
    const network = "aidp-test";
    // Call the function
    const result = AidpcoinKey.generateAddressObject(network);
    // Assertions
    expect(result.network).toBe(network); //Test default
  });

  it("Should handle aidp-test", () => {
    const network = "aidp-test";
    // Call the function
    const result = AidpcoinKey.generateAddressObject(network);
    // Assertions
    expect(result.network).toBe(network); //Test default
  });

  // Add more tests if needed to cover different scenarios
});
