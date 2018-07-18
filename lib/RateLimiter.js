class RateLimiter {
  constructor(rpm = 60, timestamp = this.now()) {
    this.maxRPM = rpm;
    this._lookup = new Map();
    this.timestamp = timestamp;
  }

  get lookup() {
    if (this.shouldLookupRefresh()) {
      this.refreshLookup();
    }
    return this._lookup;
  }

  now() {
    return Math.floor(Date.now() / 1000 / 60);
  }

  getIPCounts(ip) {
    return this.lookup.get(ip) || 0;
  }

  setIPCounts(ip, n) {
    this.lookup.set(ip, n);
  }

  incrementIPCounts(ip) {
    this.setIPCounts(ip, this.getIPCounts(ip) + 1);
    return this.getIPCounts(ip);
  }

  refreshLookup(timestamp = this.now()) {
    this.timestamp = timestamp;
    this._lookup.clear();
  }

  shouldResponse(ip) {
    return this.getIPCounts(ip) <= this.maxRPM;
  }

  shouldLookupRefresh(timestamp = this.now()) {
    return timestamp !== this.timestamp;
  }
}

module.exports = RateLimiter;
