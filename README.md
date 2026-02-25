1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll :
====================================================================================================================
getElementById :
---------------------
এর দারা আমরা শুধু আইডি সিলেক্ট করতে পারি।

getElementsByClassName :
-----------------------------
এর দারা আমরা শুধু ক্লাস সিলেক্ট করতে পারি।

querySelector :
-------------------
এর দারা আমরা আইডি এবং ক্লাস দুটোই সিলেক্ট করতে পারি সে ক্ষেত্রে অবশ্যই আইডির ক্ষেত্রে (#) এবং ক্লাস এর ক্ষেত্রে (.) শুরুতে দিতে হবে।

querySelectorAll :
---------------------
এর দারা একের অধিক এলিমেন্ট সিলেক্ট করতে হয়

2. How do you create and insert a new element into the DOM?
==================================================================
document.createElement("") উক্ত কোটেশন ("") এর ভিতরে টেগ এর নাম দিতে হবে। তারপর উক্ত টেগ .innerHTML দিয়ে লিখতে হবে।

3. What is Event Bubbling? And how does it work :
========================================================
ইভেন্ট যেই এলিমেন্টে হয় উক্ত এলিমেন্ট এর পেরেন্টে জাওয়াকে Event Bubbling আর এটা স্টপ করার জন্য stopPropagation() এর ব্যবহার করা হয়।

5. What is Event Delegation in JavaScript? Why is it useful :
==================================================================
এটা html document এ ইনলাইনে onclick="" মেথড ব্যবহার করে লিখতে হয়। এর দারা javascript এ কোড কম লিখতে হয়।

6. What is the difference between preventDefault() and stopPropagation() methods:
============================================================================================
preventDefault()
-------------------
এটা form submit করার ক্ষেত্রে ব্যবহার করা হয় বায় ডিফল্ট form submit করলে পেজ রিলোড হয় এর দারা এই submit অফ করা হয়।

stopPropagation()
--------------------
টার্গেটকৃত এলিমেন্ট ছাড়া অন্য কোনো এলিমেন্টে জেনো বাবলিংনা হয় এই জন্য ব্যবহৃত হয়।

