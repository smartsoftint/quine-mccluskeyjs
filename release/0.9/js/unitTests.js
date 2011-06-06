// Name: Quine-McCluskeyJS
// Version: 0.9.10.25.2010
//Please give me feedback at blarry@bateru.com
//Copyright (c) 2010 Larry Battle 10/26/2010
//Dual licensed under the MIT and GPL licenses.
//http://www.opensource.org/licenses/mit-license.php
//http://www.gnu.org/licenses/gpl.html
// Purpose: Use the Quine McCluskey Algorithm translated into Javascript. 
// QMC is an algorithm to help you reduce logic expressions and boolean algebra.

// Purpose: Provides 90%+ code coverage for inner functions.
// Usage: Load the qm.js and then paste this test file into Firebug (firefox extension) console. 
// qmMethods is the object that contains the qmMethods.
// doAllUnitTestsPass(  qmMethods );	// returns true if all test pass. Otherwise, a error will appear.
// Note: Currently, this test file only works with Firefox because assert depends on Firefox toSource method.


var doAllUnitTestsPass = function( obj ){
	var assert = function (a, b) {
		var match = (a.toSource() === b.toSource());
		if (!match) {
			throw new Error("\nDesired !== Received \nDesired: " + a.toSource() + "\nReceived: " + b.toSource());
		}
		return match;
	};

	// Test for all functions.
	var testFunc = "";
	try {
		testFunc = "Testing assert()";
		assert(1 + 1, 2);
		assert(true, true);
		assert(false, false);
		assert("1000", "10" + "00");
		assert([1, 2, 3], [1, 2, 3]);

		testFunc = "Testing obj.isArray()";
		assert(true, obj.isArray([1, 2, 3]));
		assert(false, obj.isArray({
			"1": 3
		}));
		assert(false, obj.isArray("not array"));
		assert(false, obj.isArray(1));

		testFunc = "Testing obj.getObjProperties()";
		assert([], obj.getObjProperties({}));
		assert(["1", "2", "3"], obj.getObjProperties({
			"1": 1,
			"2": 1,
			"3": 1
		}));
		assert(["help", "key", "arr"], obj.getObjProperties({
			"help": 1,
			"key": 1,
			"arr": []
		}));

		testFunc = "Testing obj.getOne1DiffFrom2BinStrCompare()";
		assert("", obj.getOne1DiffFrom2BinStrCompare("01", "111", "-"));
		assert("", obj.getOne1DiffFrom2BinStrCompare("1111-", "-1111", "-"));
		assert("", obj.getOne1DiffFrom2BinStrCompare("---", "-00", "-"));
		assert("", obj.getOne1DiffFrom2BinStrCompare("1", "-1101", "-"));
		assert("", obj.getOne1DiffFrom2BinStrCompare("11-", "-1101", "-"));
		assert("", obj.getOne1DiffFrom2BinStrCompare("1", "1", "-"));
		assert("-", obj.getOne1DiffFrom2BinStrCompare("0", "1", "-"));
		assert("-", obj.getOne1DiffFrom2BinStrCompare("1", "0", "-"));
		assert("0-", obj.getOne1DiffFrom2BinStrCompare("01", "00", "-"));
		assert("-1", obj.getOne1DiffFrom2BinStrCompare("01", "11", "-"));
		assert("0-", obj.getOne1DiffFrom2BinStrCompare("01", "00", "-"));
		assert("-11", obj.getOne1DiffFrom2BinStrCompare("111", "011", "-"));
		assert("-111", obj.getOne1DiffFrom2BinStrCompare("0111", "1111", "-"));
		assert("1-1-1", obj.getOne1DiffFrom2BinStrCompare("101-1", "111-1", "-"));
		assert("----", obj.getOne1DiffFrom2BinStrCompare("1---", "0---", "-"));

		testFunc = "Testing obj.getStrCopy()";
		assert("1", obj.getStrCopy("1"));
		assert("1", obj.getStrCopy("1", 1));
		assert("##", obj.getStrCopy("#", 2));
		assert("*****", obj.getStrCopy("*", 5));
		assert("11111", obj.getStrCopy("1", 5));

		testFunc = "Testing obj.insertionSort()";
		assert([], obj.insertionSort([]));
		assert([1], obj.insertionSort([1]));
		assert([1, 2], obj.insertionSort([1, 2]));
		assert([0, 0, 0], obj.insertionSort([0, 0, 0]));
		assert([1, 1, 2], obj.insertionSort([1, 2, 1]));
		assert([-1, 0], obj.insertionSort([0, -1]));
		assert([-1, 1, 2], obj.insertionSort([1, 2, -1]));
		assert([1, 2, 3, 4, 5], obj.insertionSort([5, 4, 3, 2, 1]));
		assert([-10000, 0, 1, 2, 3, 4, 5, 50, 20000, 1000000], obj.insertionSort([50, 1000000, 20000, 5, 4, 3, 2, 1, -10000, 0]));
		assert([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5], obj.insertionSort([5, 4, 5, 4, 5, 4, 5, 4, 5, 3, 2, 3, 2, 3, 1]));

		testFunc = "Testing obj.getUniqueNumArr()";
		assert([], obj.getUniqueNumArr([]));
		assert([1], obj.getUniqueNumArr([1, 1, 1, 1]));
		assert([1, 2, 3, 4, 5], obj.getUniqueNumArr([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]));
		assert([3, 2, 1], obj.getUniqueNumArr([3, 3, 3, 2, 2, 1]));
		assert([1, 2, 3], obj.getUniqueNumArr([1, 2, 2, 3, 3, 3, 2, 2, 1]));

		testFunc = "Testing obj.getUniqueSortedNumArr()";
		assert([], obj.getUniqueSortedNumArr([]));
		assert([1], obj.getUniqueSortedNumArr([1]));
		assert([1, 2], obj.getUniqueSortedNumArr([1, 2]));
		assert([1, 2, 3, 4, 5], obj.getUniqueSortedNumArr([1, 2, 3, 4, 5]));
		assert([1, 2, 3, 4, 5], obj.getUniqueSortedNumArr([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]));
		assert([1, 2, 3], obj.getUniqueSortedNumArr([3, 3, 3, 2, 2, 1]));
		assert([1, 2, 3, 5, 10], obj.getUniqueSortedNumArr([1, 10, 3, 10, 10, 10, 5, 3, 2, 1]));

		testFunc = "Testing obj.getUniqueSortedNumStr()";
		assert("5,7,11,12,14,20,21,22,23,27,29", obj.getUniqueSortedNumStr("12,14,11,27,21,29,23,5,7,20,22", ","));

		testFunc = "Testing obj.replaceCharAtIndex()";
		assert("1", obj.replaceCharAtIndex("5", 0, "1"));
		assert("144", obj.replaceCharAtIndex("444", 0, "1"));
		assert("414", obj.replaceCharAtIndex("444", 1, "1"));
		assert("441", obj.replaceCharAtIndex("444", 2, "1"));
		assert("1111", obj.replaceCharAtIndex("1211", 1, "1"));
		assert("1", obj.replaceCharAtIndex("3", [0], "1"));
		assert("1", obj.replaceCharAtIndex("144", [1, 1], ""));
		assert("1111", obj.replaceCharAtIndex("1234", [1, 2, 3], "1"));

		testFunc = "Testing obj.getBinaryStrFromDecimal()";
		assert("0", obj.getBinaryStrFromDecimal(0));
		assert("1", obj.getBinaryStrFromDecimal(1));
		assert("1010", obj.getBinaryStrFromDecimal(10));
		assert("00000", obj.getBinaryStrFromDecimal(0, 5));
		assert("00001", obj.getBinaryStrFromDecimal(1, 5));
		assert("01010", obj.getBinaryStrFromDecimal(10, 5));
		assert("01010", obj.getBinaryStrFromDecimal(10, 5));
		assert("11111", obj.getBinaryStrFromDecimal(31, 5));

		testFunc = "Testing obj.getCharIndexesFromSimStrs()";
		assert([], obj.getCharIndexesFromSimStrs("", "", ""));
		assert([], obj.getCharIndexesFromSimStrs("1", "123", "2"));
		assert([], obj.getCharIndexesFromSimStrs("1111", "123", "1"));
		assert([], obj.getCharIndexesFromSimStrs("--11-", "--31-", "1"));
		assert([0], obj.getCharIndexesFromSimStrs("-", "-", "-"));
		assert([0, 1], obj.getCharIndexesFromSimStrs("--", "--", "-"));
		assert([3], obj.getCharIndexesFromSimStrs("111-1", "123-", "-"));
		assert([0, 1, 4], obj.getCharIndexesFromSimStrs("--11-", "--31-", "-"));

		testFunc = "Testing obj.getBinStrFromNumArr()";
		assert([], obj.getBinStrFromNumArr([]));
		assert(["0"], obj.getBinStrFromNumArr([0]));
		assert(["1"], obj.getBinStrFromNumArr([1]));
		assert(["0", "1"], obj.getBinStrFromNumArr([0, 1]));
		assert(["00", "01", "10", "11"], obj.getBinStrFromNumArr([0, 1, 2, 3]));
		assert(["1010", "1011", "1100", "1101"], obj.getBinStrFromNumArr([10, 11, 12, 13]));
		assert(["00000", "00001", "00010", "11111"], obj.getBinStrFromNumArr([0, 1, 2, 31]));
		assert(["00000", "00001", "00010", "00011"], obj.getBinStrFromNumArr([0, 1, 2, 3], 5));
		assert(["00000", "00001", "00010", "00011"], obj.getBinStrFromNumArr([0, 1, 2, 2, 3, 3, 3], 5, true));

		testFunc = "Testing obj.getGroupedMidTermsFromBinStrArr()";
		assert(({
			keys: [1],
			1: [{
				midTerms: "1",
				value: "1"
			}]
		}), obj.getGroupedMidTermsFromBinStrArr(obj.getBinStrFromNumArr([1])));
		assert(({
			keys: [0, 1, 2, 3],
			3: [{
				midTerms: "7",
				value: "111"
			}],
			2: [{
				midTerms: "6",
				value: "110"
			},
			{
				midTerms: "5",
				value: "101"
			},
			{
				midTerms: "3",
				value: "011"
			}],
			1: [{
				midTerms: "4",
				value: "100"
			},
			{
				midTerms: "2",
				value: "010"
			},
			{
				midTerms: "1",
				value: "001"
			}],
			0: [{
				midTerms: "0",
				value: "000"
			}]
		}), obj.getGroupedMidTermsFromBinStrArr(obj.getBinStrFromNumArr([0, 1, 2, 3, 4, 5, 6, 7])));

		testFunc = "Testing obj.isObjInRightFormat()";
		assert("", obj.isObjInRightFormat({
			inputs: "A,B,C,D,E",
			midTerms: "5,7,11,12,27,29",
			dontNeeds: "14,20,21,22,23"
		}));

		testFunc = "Testing obj.getGroupedMTFromNumArr()";
		assert(({
			keys: [1],
			1: [{
				midTerms: "1",
				value: "1"
			}]
		}), obj.getGroupedMTFromNumArr([1]));

		testFunc = "Testing obj.getPrimeImplicantsFromMidterms()";
		assert([{
			"midTerms": "0,4",
			"value": "-00"
		},
		{
			"midTerms": "0,1",
			"value": "00-"
		}], obj.getPrimeImplicantsFromMidterms(obj.getGroupedMTFromNumArr([0, 1, 4])));
		assert([{
			midTerms: "12,14",
			value: "011-0"
		},
		{
			midTerms: "11,27",
			value: "-1011"
		},
		{
			midTerms: "21,29",
			value: "1-101"
		},
		{
			midTerms: "5,7,21,23",
			value: "-01-1"
		},
		{
			midTerms: "20,21,22,23",
			value: "101--"
		}], obj.getPrimeImplicantsFromMidterms(obj.getGroupedMTFromNumArr([5, 7, 21, 23, 20, 21, 22, 12, 14, 21, 29, 11, 27])));

		testFunc = "Testing obj.getObjFromStrSplit()";
		assert(({}), obj.getObjFromStrSplit("", ""));
		assert(({
			0: 1
		}), obj.getObjFromStrSplit("0"));
		assert(({
			0: null
		}), obj.getObjFromStrSplit("0", null, null));
		assert(({
			3: 1,
			2: 1,
			1: 1,
			0: 1
		}), obj.getObjFromStrSplit("0,1,2,3"));

		testFunc = "Testing obj.getMatchLenAfterAppendPIToMT()";
		var mtObj = obj.getObjFromStrSplit("1,2,3,4", ",", (function () {
			return {
				"PIs": [],
				"PIsKeys": {}
			};
		}));
		assert(1, obj.getMatchLenAfterAppendPIToMT(0, "0,4", mtObj));
		assert([0], mtObj[4].PIs);

		testFunc = "Testing obj.getIndexOfPIWithMaxLenInMidTerm()";
		var PITest = {
			"0": {
				matchLength: 0
			},
			"1": {
				matchLength: 1
			},
			"2": {
				matchLength: 2
			},
			"3": {
				matchLength: 3
			},
			"4": {
				matchLength: 4
			}
		};
		assert(-1, obj.getIndexOfPIWithMaxLenInMidTerm([], PITest));
		assert(0, obj.getIndexOfPIWithMaxLenInMidTerm([0], PITest));
		assert(2, obj.getIndexOfPIWithMaxLenInMidTerm([0, 1, 2], PITest));
		assert(4, obj.getIndexOfPIWithMaxLenInMidTerm([0, 4], PITest));

		testFunc = "Testing obj.getMTWithPIMatchAndAddPILenToPI()";
		var mtObj2 = obj.getObjFromStrSplit("0,1,4", ",", function () {
			return {
				"PIs": [],
				"PIsKeys": {}
			};
		}),
			PITest2 = obj.getPrimeImplicantsFromMidterms(obj.getGroupedMTFromNumArr([0, 1, 4]));
		assert(({
			4: {
				PIs: [0],
				PIsKeys: {
					0: 1
				}
			},
			1: {
				PIs: [1],
				PIsKeys: {
					1: 1
				}
			},
			0: {
				PIs: [1, 0],
				PIsKeys: {
					1: 1,
					0: 1
				}
			}
		}), obj.getMTWithPIMatchAndAddPILenToPI(mtObj2, PITest2));
		assert([{
			midTerms: "0,4",
			value: "-00",
			matchLength: 2
		},
		{
			midTerms: "0,1",
			value: "00-",
			matchLength: 2
		}], PITest2);

		testFunc = "Testing obj.getLeastPrimeImplicantsByGraph()";
		var mtStr2 = "0,1,4";
		PITest2 = obj.getPrimeImplicantsFromMidterms(obj.getGroupedMTFromNumArr([0, 1, 4]));
		assert([{
			midTerms: "0,4",
			value: "-00"
		},
		{
			midTerms: "0,1",
			value: "00-"
		}], obj.getLeastPrimeImplicantsByGraph(mtStr2, PITest2));
		mtStr2 = "5,7,11,12,14,20,21,22,23,27,29";
		assert([{
			midTerms: "21,29",
			value: "1-101"
		},
		{
			midTerms: "11,27",
			value: "-1011"
		},
		{
			midTerms: "5,7,21,23",
			value: "-01-1"
		},
		{
			midTerms: "20,21,22,23",
			value: "101--"
		},
		{
			midTerms: "12,14",
			value: "011-0"
		}], obj.getLeastPrimeImplicantsByGraph(mtStr2, obj.getPrimeImplicantsFromMidterms(obj.getGroupedMTFromNumArr(mtStr2.split(",")))));

		// Test that need asserts.
		var userInputObj = {
			inputs: "A,B,C,D",
			midTerms: "2,4,6,8,9,10,12,13,15"
		}, userInputObj2 = {
			dontNeeds: "5,18,19,21,23",
			inputs: "A,B,C,D,E",
			midTerms: "2,3,7,10,12,15,27"
		};
		assert( ({0:["B*CD*", "A*BD*", "AB*D*", "AC*", "ABD"], 1:["-010", "01-0", "10-0", "1-0-", "11-1"]}),
				obj.getLeastPI(userInputObj) );
		assert( ({0:["B*C*D", "A*C*DE*", "A*BCD*E*", "A*CDE", "AC*DE"], 1:["-001-", "0-010", "01100", "0-111", "1-011"]}),
				obj.getLeastPI(userInputObj2) );
	}
	catch (e) {
		throw new Error(testFunc + " failed: " + e.message);
	}
	return true;
};