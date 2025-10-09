export class Dictionary<KT, VT> {
	private keys: KT[] = [];
	private values: VT[] = [];
	private isCache: boolean;
	public get count(): number {
		return this.Count();
	}

	public constructor(isCache: boolean = false) {
		this.isCache = isCache;
	}

	public Add(key: any, value: any): number {
		if (this.isCache) {
			this[key] = value;
		}
		this.keys.push(key);
		return this.values.push(value);
	}

	public Remove(key: any) {
		var index = this.keys.indexOf(key, 0);
		this.keys.splice(index, 1);
		this.values.splice(index, 1);
		if (this.isCache) {
			delete this[key];
		}
	}

	private Count(): number {
		return this.keys.length;
	}

	public SetDicValue(key: any, value: any) {
		var index = this.keys.indexOf(key, 0);
		if (index != -1) {
			this.keys[index] = key;
			this.values[index] = value;
			if (this.isCache) {
				this[key] = value;
			}
		}
		else {
			this.Add(key, value);
		}
	}

	public TryGetValue(key: KT): VT {
		var index = this.keys.indexOf(key, 0);
		if (index != -1) {
			return this.values[index];
		}
		return null;
	}

	public ContainsKey(key: any): boolean {
		let ks = this.keys;
		for (let i = 0; i < ks.length; ++i) {
			if (ks[i] == key) {
				return true;;
			}
		}
		return false;
	}

	public GetKeys(): KT[] {
		return this.keys;
	}

	public GetValues(): VT[] {
		return this.values;
	}
}
