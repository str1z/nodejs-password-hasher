# What is password hashing?

## Use cases...

- It's a way to keep users' password relatively safe even if there is a data breach.

## Terms...

- Hashing function
- Input
- Hash (Output)
- Salt
- Cost (Salt Rounds)

## Basic concept...

```js
let password = 123;
let hasher = (input) => input % 2;
let hash = hasher(password);
// hash = 123 % 2 = 1
```

Now given the hashing function and the hash, try to find the password. There are just to many possibilities because every odd number as the password will result in a hash of 1.

Obviously, this is simplified. Hashing functions like sha256 is way more elaborate and unpredictable.

## Verification

To verify if the hashed password and the to be verified passwords are the same, we simply hash the to be verified password and compare them.

## One step further...

Users will sometimes have the same hash, in other words, there is a high chance that their passwords are identical.

Fortuanatly, we have the salt. The salt is just some random data that we will use in our hashing function.

```js
let password = 123;
let hasher = (input, salt) => [salt, (input + salt) % 2];
let hash = hasher(password, Math.floor(Math.random() * 100));
```

> Instead of just returning the hash, we return the salt and the hash so that we can verify with the same salt.

## Not good enough...

In a world where computers are super fast, a simple hash can get decrypted in a couple of iterations. We need to make something stronger...

The cost is the amount of effort needed to decrypt and hash a password. I will refer it as salt rounds from now on.

Salt rounds are the number of iterations we repeat the hashing function. We also need to add it in the front of the output so that we can verify passwords.

```js
let password = 121345234635463453;
let hasher = (input, salt, saltRounds) => {
  let out = input;
  for (let n = 0; i < saltRounds; i++) {
    out = (out + salt) % 23452354;
  }
  return [saltRounds, salt, out];
};
let salt = Math.floor(Math.random() * 100);
let hash = hasher(password, salt, 10);
```

> In the some implemetations, the amount of `iterations` is in fact the 2 to the power of `salt rounds(cost)`.

## Let's make an actual password hasher in Node.js!
