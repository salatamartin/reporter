const { mock } = require('pactum');
const assert = require('assert');
const { publish } = require('../src');

describe('targets - slack', () => {

  it('should send test-summary', async () => {
    const id = mock.addInteraction('post test-summary to slack');
    await publish({
      config: {
        "reports": [
          {
            "targets": [
              {
                "name": "slack",
                "inputs": {
                  "url": "http://localhost:9393/message"
                }
              }
            ],
            "results": [
              {
                "type": "testng",
                "files": [
                  "test/data/testng/single-suite.xml"
                ]
              }
            ]
          }
        ]
      }
    });
    assert.equal(mock.getInteraction(id).exercised, true);
  });

  it('should send test-summary with multiple suites', async () => {
    const id = mock.addInteraction('post test-summary to slack with multiple suites');
    await publish({
      config: {
        "reports": [
          {
            "targets": [
              {
                "name": "slack",
                "inputs": {
                  "url": "http://localhost:9393/message"
                }
              }
            ],
            "results": [
              {
                "type": "testng",
                "files": [
                  "test/data/testng/multiple-suites.xml"
                ]
              }
            ]
          }
        ]
      }
    });
    assert.equal(mock.getInteraction(id).exercised, true);
  });

  it('should send test-summary-slim with multiple suites', async () => {
    const id = mock.addInteraction('post test-summary-slim to slack with multiple suites');
    await publish({
      config: {
        "reports": [
          {
            "targets": [
              {
                "name": "slack",
                "inputs": {
                  "url": "http://localhost:9393/message",
                  "publish": "test-summary-slim"
                }
              }
            ],
            "results": [
              {
                "type": "testng",
                "files": [
                  "test/data/testng/multiple-suites.xml"
                ]
              }
            ]
          }
        ]
      }
    });
    assert.equal(mock.getInteraction(id).exercised, true);
  });

  it('should send failure-details with multiple suites', async () => {
    const id = mock.addInteraction('post failure-details to slack with multiple suites');
    await publish({
      config: {
        "reports": [
          {
            "targets": [
              {
                "name": "slack",
                "inputs": {
                  "url": "http://localhost:9393/message",
                  "publish": "failure-details"
                }
              }
            ],
            "results": [
              {
                "type": "testng",
                "files": [
                  "test/data/testng/multiple-suites.xml"
                ]
              }
            ]
          }
        ]
      }
    });
    assert.equal(mock.getInteraction(id).exercised, true);
  });

  it('should send failure-details with single suite', async () => {
    const id = mock.addInteraction('post failure-details to slack with single suite');
    await publish({
      config: {
        "reports": [
          {
            "targets": [
              {
                "name": "slack",
                "inputs": {
                  "url": "http://localhost:9393/message",
                  "publish": "failure-details"
                }
              }
            ],
            "results": [
              {
                "type": "testng",
                "files": [
                  "test/data/testng/single-suite-failures.xml"
                ]
              }
            ]
          }
        ]
      }
    });
    assert.equal(mock.getInteraction(id).exercised, true);
  });

  afterEach(() => {
    mock.clearInteractions();
  });

});