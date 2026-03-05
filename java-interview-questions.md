# Java Programming Interview Questions

## Easy Level (1-20)

### 1. What is Java?
Java is a high-level, object-oriented programming language developed by Sun Microsystems (now Oracle). It follows the "write once, run anywhere" principle through the use of the Java Virtual Machine (JVM).

### 2. What is the difference between JDK, JRE, and JVM?
- **JVM** (Java Virtual Machine): Executes Java bytecode
- **JRE** (Java Runtime Environment): Provides libraries and JVM to run Java applications
- **JDK** (Java Development Kit): Contains JRE plus development tools like compiler, debugger

### 3. What are the main features of Java?
- Platform independent
- Object-oriented
- Simple and easy to learn
- Secure
- Multithreaded
- Robust
- Automatic memory management (Garbage Collection)

### 4. What is the difference between `==` and `.equals()` method?
- `==` compares object references (memory addresses)
- `.equals()` compares object content/values

### 5. What are the access modifiers in Java?
- `public`: Accessible everywhere
- `private`: Accessible only within the same class
- `protected`: Accessible within the same package and subclasses
- Default (no modifier): Accessible within the same package

### 6. What is the difference between String, StringBuilder, and StringBuffer?
- **String**: Immutable
- **StringBuilder**: Mutable, not thread-safe, faster
- **StringBuffer**: Mutable, thread-safe, slower

### 7. What is the difference between an interface and an abstract class?
- Interface can have only abstract methods (before Java 8) and can't have state
- Abstract class can have both abstract and concrete methods and can maintain state
- A class can implement multiple interfaces but extend only one abstract class

### 8. What is inheritance in Java?
Inheritance is an OOP mechanism where a class (child/subclass) acquires properties and behaviors from another class (parent/superclass) using the `extends` keyword.

### 9. What is polymorphism?
Polymorphism allows objects to take multiple forms. It includes:
- **Compile-time polymorphism**: Method overloading
- **Runtime polymorphism**: Method overriding

### 10. What is encapsulation?
Encapsulation is the bundling of data and methods that operate on that data within a single unit (class), hiding internal details from the outside world using access modifiers.

### 11. What is the difference between `final`, `finally`, and `finalize()`?
- `final`: Keyword to make variables constant, prevent method overriding, or prevent inheritance
- `finally`: Block that always executes after try-catch, used for cleanup
- `finalize()`: Method called by garbage collector before object destruction (deprecated in Java 9)

### 12. What is a constructor?
A constructor is a special method with the same name as the class, used to initialize objects. It has no return type and is called automatically when an object is created.

### 13. What is method overloading?
Method overloading allows multiple methods with the same name but different parameters (number, type, or order) in the same class.

### 14. What is method overriding?
Method overriding occurs when a subclass provides a specific implementation for a method already defined in its superclass, with the same signature.

### 15. What are wrapper classes?
Wrapper classes provide object representations of primitive data types: Integer, Double, Boolean, Character, etc. They allow primitives to be used as objects.

### 16. What is autoboxing and unboxing?
- **Autoboxing**: Automatic conversion of primitive types to their wrapper class objects
- **Unboxing**: Automatic conversion of wrapper class objects to primitive types

### 17. What is the `static` keyword?
`static` means the member belongs to the class rather than instances. Static members are shared across all instances and can be accessed without creating an object.

### 18. What is the `this` keyword?
`this` is a reference to the current object instance. It's used to refer to instance variables, call instance methods, or pass the current object as a parameter.

### 19. What is the `super` keyword?
`super` refers to the parent class. It's used to access parent class methods, constructors, and variables that are hidden by the subclass.

### 20. What is the difference between `ArrayList` and `LinkedList`?
- **ArrayList**: Uses dynamic array, faster random access, slower insertion/deletion
- **LinkedList**: Uses doubly-linked list, slower random access, faster insertion/deletion

---

## Medium Level (21-40)

### 21. Explain the Java Collections Framework hierarchy.
The Collections Framework includes interfaces (Collection, List, Set, Queue, Map) and their implementations (ArrayList, HashSet, HashMap, etc.). It provides data structures and algorithms for storing and manipulating groups of objects.

### 22. What is the difference between `HashMap` and `Hashtable`?
- **HashMap**: Not synchronized, allows null keys and values, faster
- **Hashtable**: Synchronized, doesn't allow null keys or values, slower, legacy class

### 23. What is the difference between `HashMap` and `ConcurrentHashMap`?
`ConcurrentHashMap` is thread-safe without locking the entire map. It uses segment-based locking (or CAS operations in newer versions), allowing better concurrency than synchronized HashMap.

### 24. What are generics in Java?
Generics enable types (classes and interfaces) to be parameters when defining classes, interfaces, and methods. They provide type safety and eliminate the need for type casting.

### 25. What is the diamond problem in Java and how does Java solve it?
The diamond problem occurs in multiple inheritance when a class inherits from two classes with a common ancestor. Java solves this by not supporting multiple inheritance with classes, only with interfaces (using default methods).

### 26. What are functional interfaces?
A functional interface has exactly one abstract method. They can have multiple default or static methods. Examples: Runnable, Callable, Comparator. Used extensively in lambda expressions.

### 27. What are lambda expressions?
Lambda expressions provide a concise way to represent anonymous functions. They enable functional programming in Java and are used primarily with functional interfaces.
```java
(parameters) -> expression or { statements }
```

### 28. What is the Stream API?
The Stream API (Java 8+) provides a functional approach to processing collections. It supports operations like filter, map, reduce, and allows for parallel processing.

### 29. Explain exception handling in Java.
Exception handling uses try-catch-finally blocks to handle runtime errors. Exceptions are divided into:
- **Checked exceptions**: Must be caught or declared (IOException, SQLException)
- **Unchecked exceptions**: Runtime exceptions (NullPointerException, ArrayIndexOutOfBoundsException)

### 30. What is the difference between `throw` and `throws`?
- `throw`: Used to explicitly throw an exception
- `throws`: Used in method signature to declare exceptions that might be thrown

### 31. What is multithreading?
Multithreading is the concurrent execution of multiple threads. In Java, threads can be created by extending Thread class or implementing Runnable interface.

### 32. What is the difference between `Runnable` and `Callable`?
- **Runnable**: `run()` method returns void, can't throw checked exceptions
- **Callable**: `call()` method returns a value, can throw checked exceptions

### 33. What is synchronization in Java?
Synchronization prevents multiple threads from accessing shared resources simultaneously, avoiding race conditions. It's achieved using the `synchronized` keyword.

### 34. What are the states of a thread?
- New
- Runnable
- Running
- Blocked/Waiting
- Timed Waiting
- Terminated

### 35. What is the volatile keyword?
`volatile` ensures that changes to a variable are immediately visible to all threads. It prevents caching of variable values and ensures happens-before relationship.

### 36. What is garbage collection?
Garbage collection is automatic memory management in Java. The garbage collector identifies and removes objects that are no longer referenced, freeing memory.

### 37. What are strong, soft, weak, and phantom references?
- **Strong**: Normal references, object not GC'd while referenced
- **Soft**: Object GC'd when memory is low
- **Weak**: Object GC'd in next GC cycle
- **Phantom**: Used for cleanup actions before object removal

### 38. What is the `transient` keyword?
`transient` prevents serialization of specific fields. Transient fields are not saved when an object is serialized.

### 39. What is serialization?
Serialization converts an object into a byte stream for storage or transmission. The class must implement the `Serializable` interface.

### 40. What is the difference between `Comparable` and `Comparator`?
- **Comparable**: Natural ordering, implemented by the class itself, single sorting sequence
- **Comparator**: Custom ordering, external to the class, multiple sorting sequences

---

## Hard Level (41-50)

### 41. Explain the Java Memory Model (JMM).
The JMM defines how threads interact through memory and what behaviors are allowed in concurrent execution. It specifies rules for visibility, ordering, and atomicity of variable accesses across threads.

### 42. What is the happens-before relationship?
Happens-before defines memory visibility guarantees between actions. If action A happens-before action B, then A's effects are visible to B. It's established through synchronization, volatile variables, thread start/join, etc.

### 43. How does the garbage collector work internally?
Modern GC (like G1GC) divides heap into regions, performs generational collection (young and old generations), and uses algorithms like mark-and-sweep, copying, or compacting. It includes minor GC (young gen) and major GC (full heap).

### 44. What are the different types of garbage collectors in Java?
- Serial GC
- Parallel GC
- CMS (Concurrent Mark Sweep) - deprecated
- G1GC (Garbage First)
- ZGC (Z Garbage Collector)
- Shenandoah GC

### 45. Explain the Fork/Join framework.
Fork/Join is designed for parallel processing of recursive tasks. It uses work-stealing algorithm where idle threads steal tasks from busy threads. Used with `ForkJoinPool` and `RecursiveTask`/`RecursiveAction`.

### 46. What is the difference between `CountDownLatch` and `CyclicBarrier`?
- **CountDownLatch**: One-time use, threads wait for count to reach zero
- **CyclicBarrier**: Reusable, threads wait for each other at a barrier point

### 47. What are the SOLID principles?
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

### 48. Explain the Singleton design pattern and its thread-safe implementations.
Singleton ensures only one instance of a class exists. Thread-safe implementations:
- Synchronized method
- Double-checked locking with volatile
- Bill Pugh (static inner class)
- Enum singleton (best practice)

### 49. What is reflection and when would you use it?
Reflection allows runtime inspection and manipulation of classes, methods, and fields. Used in frameworks (Spring, Hibernate), testing, serialization. It bypasses compile-time type checking and can access private members.

### 50. Explain ClassLoader and the class loading mechanism.
ClassLoader loads classes into JVM. Hierarchy:
- **Bootstrap ClassLoader**: Loads core Java classes
- **Extension ClassLoader**: Loads extension classes
- **Application ClassLoader**: Loads application classes

Follows parent delegation model: delegates to parent before attempting to load itself. Custom ClassLoaders can be created for dynamic loading, isolation, or hot deployment.
