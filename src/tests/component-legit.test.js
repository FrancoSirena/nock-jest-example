const axios = require('axios')
const nock = require('nock')
const component = require("../component.js");

/**
 * @jest-environment jsdom
 */
describe("component", () => {
  let scope
  async function scopeDone() {
    if (!scope.isDone()) {
      await new Promise((r) => setTimeout(r, 100));
      return scopeDone()
    }
    return true
  }
  afterAll(() => {
    window.example.alive = false
    nock.cleanAll()
    nock.restore()
  })
  beforeAll(() => {
    window.example = {
      alive: true
    }
    axios.defaults.adapter = require('axios/lib/adapters/http');
    scope = nock("https://api.mocki.io")
      .get("/v1/1767b67d")
      .reply(200, {
        results: [
          {
            band: "noisy",
            genre: "rock"
          }
        ]
      })
      .get("/v1/1db31e8e")
      .reply(200, {
        results: [
          {
            band: "noisy",
            song: "the good one"
          }
        ]
      })
  });
  test("it should list the bands and genres", async () => {
    component();
    expect(document.body.innerHTML).toMatch(/Listing bands and songs/i);
    await new Promise((r) => setTimeout(r, 100));
    expect(document.body.innerHTML).toMatch(/band: noisy genre rock/i);
    await scopeDone()
    console.log('No problems')
  });
});
