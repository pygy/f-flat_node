[![asciicast](https://asciinema.org/a/39282.png)](https://asciinema.org/a/39282)

```forth
** Welcome to f♭ **

f♭> 0.1 0.2 +
[ 0.3 ]

f♭> 0.3 =
[ true ]

f♭> clr
[]

f♭> -1 sqrt
[ 0+1i ]

f♭> 1 atan 4 *
[ 0+1i, 3.1415926535897932385 ]

f♭> * exp
[ -1-3.7356616720497115803e-20i ]

f♭> abs
[ 1 ]

f♭> clr
[]

f♭> [ 2 swap ^ 1 - prime? ] "mersenne?" def
[]

f♭> 10 integers
[ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] ]

f♭> [ mersenne? ] map
[ [ true, true, true, false, true, false, true, false, false, false ] ]

f♭> clr
[]

f♭> 1000 !
[ 4.0238726007709377384e+2567 ]

f♭> clr
[]

f♭> i !
[ 0.49801566811835599106-0.15494982830181068731i ]

f♭> { first: "Manfred" }
[ { first: 'Manfred' } ]

f♭> { last: 'von Thun' }
[ { first: 'Manfred' }, { last: 'von Thun' } ]

f♭> +
[ { first: 'Manfred', last: 'von Thun' } ]
```
