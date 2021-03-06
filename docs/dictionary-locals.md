# Dictionary / Locals

Unlike many other languages, f♭ does not have a concept of variables or lambdas.  Like most stack based languages the primary location for value storage is the stack.  f♭ has a write once dictionary for storage of word definitions.  Values within a dictionary cannot be overwritten or deleted. However, using child stacks \(discussed later\) dictionary words can be shadowed. \(similar to JS scoping rules\).

Values can be stored and recalled from the stack using the `sto` and `rcl` verbs.

```
f♭> 123 x: sto
[  ]

f♭> x: rcl
[ 123 ]

f♭> x: 456 sto
Error: Cannot overrite definitions in strict mode: x
[  ]

f♭> x: rcl
[ 123 123 ]

f♭> clr [ 456 x: sto x: rcl ] fork x: rcl
[ [ 456 ] 123 ]
```

## Word requirements

* Cannot contain a colon \(`:`\) \(special meaning\)
* Cannot start with a period `.`
* Cannot contain white space \(space, new lines, tabs, or comma `,`\).
* Cannot contain brackets \( `(){}[]` \).
* Cannot contain quotes \( '"\` \)
* Cannot be numeric \(starting with a numeric value is ok\)
* Cannot begin with a hash \(`#`\)
* Cannot be a reserved word \(`null`, `true` or `false`\)



