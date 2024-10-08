function EvalEquation(problem, pemdas) {
	let id = 0
	function lookup(v) {
		const table = {pi:3.141592653589793,e:2.718281828459045,phi:1.618033988749895,euler:2.718281828459045,"+":1,"-":1,"*":1,"/":1,"Infinity":Infinity,"infinity":Infinity,"inf":Infinity,"Inf":Infinity}
		return (v[0] === "-" ? -table[v] : table[v]) || Number(v)
	}
	if (pemdas) {
		return 0 // Just a reminder that there must be a way to handle pemdas
	} else {
		return problem.matchAll(/-?[0-9]+|-?[0-9]\.[0-9]*|pi|euler|e|phi|[iI]nfinity|[iI]nf|[+\-*/\^]/gm).map(tokens => tokens.join("")).reduce(function(acc, op) {
			if (id === 0) {
				if (op === "+") {
					id = 1
					return acc
				} else if (op === "-") {
					id = 2
					return acc
				} else if (op === "*") {
					id = 3
					return acc
				} else if (op === "/") {
					id = 4
					return acc
				} else if (op === "^") {
					id = 5
					return acc
				} else {
					return lookup(op)
				}
			} else if (id === 1) {
				id = 0
				return acc + lookup(op)
			} else if (id === 2) {
				id = 0
				return acc - lookup(op)
			} else if (id === 3) {
				id = 0
				return acc * lookup(op)
			} else if (id === 4) {
				id = 0
				return acc / lookup(op)
			} else if (id === 5) {
				id = 0
				return Math.pow(acc, lookup(op))
			}
		}, 0)
	}
}
