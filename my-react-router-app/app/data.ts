////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  firstDate?: string;
};

type PrefecturesRecord = {
  id?: string;
  name?: string;
  arriveFlag?: boolean;
  firstDate?: Date;
}

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}


[
  {
    "id": "hokkaido",
    "name": "北海道",
    "first": "北海",
    "last": "道",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "aomoriken",
    "name": "青森県",
    "first": "青森",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "iwateken",
    "name": "岩手県",
    "first": "岩手",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "miyagiken",
    "name": "宮城県",
    "first": "宮城",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "akitaken",
    "name": "秋田県",
    "first": "秋田",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "yamagataken",
    "name": "山形県",
    "first": "山形",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "fukushimaken",
    "name": "福島県",
    "first": "福島",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "ibarakiken",
    "name": "茨城県",
    "first": "茨城",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "tochigiken",
    "name": "栃木県",
    "first": "栃木",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "gunmaken",
    "name": "群馬県",
    "first": "群馬",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "saitamaken",
    "name": "埼玉県",
    "first": "埼玉",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "chibaken",
    "name": "千葉県",
    "first": "千葉",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "tokyoto",
    "name": "東京都",
    "first": "東京",
    "last": "都",
    "arriveFlag": false,
    "firstDate": "2024/07/27",
    "avatar": " "
  },
  {
    "id": "kanagawaken",
    "name": "神奈川県",
    "first": "神奈川",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "niigataken",
    "name": "新潟県",
    "first": "新潟",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "toyama",
    "name": "富山県",
    "first": "富山",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "ishikawaken",
    "name": "石川県",
    "first": "石川",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "fukuiken",
    "name": "福井県",
    "first": "福井",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "yamanashiken",
    "name": "山梨県",
    "first": "山梨",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "naganoken",
    "name": "長野県",
    "first": "長野",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "gifuken",
    "name": "岐阜県",
    "first": "岐阜",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "shizuokaken",
    "name": "静岡県",
    "first": "静岡",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "aichiken",
    "name": "愛知県",
    "first": "愛知",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "mieken",
    "name": "三重県",
    "first": "三重",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "shigaken",
    "name": "滋賀県",
    "first": "滋賀",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "kyotofu",
    "name": "京都府",
    "first": "京都",
    "last": "府",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "osakafu",
    "name": "大阪府",
    "first": "大阪",
    "last": "府",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "hyogoken",
    "name": "兵庫県",
    "first": "兵庫",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "naraken",
    "first": "奈良",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "wakayamaken",
    "name": "和歌山県",
    "first": "和歌山",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "tottoriken",
    "name": "鳥取県",
    "first": "鳥取",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "shimaneken",
    "name": "島根県",
    "first": "島根",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "okayamaken",
    "name": "岡山県",
    "first": "岡山",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "hiroshimaken",
    "name": "広島県",
    "first": "広島",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "yamaguchiken",
    "name": "山口県",
    "first": "山口",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "tokushimaken",
    "name": "徳島県",
    "first": "徳島",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "kagawaken",
    "name": "香川県",
    "first": "香川",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "ehimeken",
    "name": "愛媛県",
    "first": "愛媛",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "kochiken",
    "name": "高知県",
    "first": "高知",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "fukuokaken",
    "name": "福岡県",
    "first": "福岡",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "sagaken",
    "name": "佐賀県",
    "first": "佐賀",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "nagasakiken",
    "name": "長崎県",
    "first": "長崎",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "kumamotoken",
    "name": "熊本県",
    "first": "熊本",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "oitaken",
    "name": "大分県",
    "first": "大分",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "miyazakiken",
    "name": "宮崎県",
    "first": "宮崎",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "kagoshimaken",
    "name": "鹿児島県",
    "first": "鹿児島",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  },
  {
    "id": "okinawaken",
    "name": "沖縄県",
    "first": "沖縄",
    "last": "県",
    "arriveFlag": false,
    "firstDate": null,
    "avatar": " "
  }
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.id}`,
  });
});

