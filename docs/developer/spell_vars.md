# How to use Spell Vars

Spell vars is the best way to add data to your spells attaching it per-player without needing to worry about syncing, tick logic or other complex stuff, you just need to add the data and know when and how to receive it.

- `SpellVar<T>` use it to only safe in-memory data
- `StoredSpellVar<T>` data that can be saved between server restarts

In case you need a custom implementation for of the bases you can use `ISpellVar<T>` or `IStoredSpellVar<T>` which has the base logic to work with the spell manager data.

## Normal vars without ticker

```java
public static final ISpellVar<SpellModifiers> CHARGE_MODIFIERS = new SpellVar<>(VarPersistence.NEVER);
```

```java
// Using Spell Manager Data = 'data'
data.setVariable(CHARGE_MODIFIERS, ctx.modifiers());
```

```java
SpellModifiers modifiers = data.getVariable(CHARGE_MODIFIERS);
```

## Ticker variable

```java
public static final ISpellVar<Integer> CHARGE_TIME =
        new SpellVar<Integer>(VarPersistence.NEVER).withTicker(Charge::update);
```

```java
private static int update(Player player, Integer chargeTime) {
    if (chargeTime == null) chargeTime = 0;
    if (chargeTime > 0 && !player.level().isClientSide) {
        // ... do the per-tick charge logic ...
        chargeTime--;
    }
    return chargeTime;
}
```