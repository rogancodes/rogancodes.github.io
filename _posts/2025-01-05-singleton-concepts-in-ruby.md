---
layout: post
title:  "Understanding Singleton Classes and Methods in Ruby"
tags: Ruby
---

When I started working on `ruby-lsp` gem, I got a better understanding of how singleton classes work in Ruby.

> Ruby's singleton class is a special, hidden class associated with a specific object. It allows you to define methods
> and behaviors that are unique to that object, rather than being shared across all instances of the class.

Lets consider the following example of a `Vehicle` class.

{% highlight ruby %}

class Vehicle
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def wheels
  end
end

car = Vehicle.new "car"
# => #<Vehicle:0x00007f084ad77ce8 @name="car">

car.singleton_class
# =>  #<Class:#<Vehicle:0x00007f084ad77ce8>>

car.singleton_class.singleton_class?
# => true

Vehicle.singleton_class
# => #<Class:Vehicle>

Vehicle.singleton_class.singleton_class?
# => true

{% endhighlight %}

As you can see, the `Vehicle` class also has its own singleton class, because the `Vehicle` class itself is an instance
of the `Class` class.

Let’s explore singleton methods, which are methods that are unique to an individual object.

{% highlight ruby %}

car.wheels
# => nil

car.public_methods(false) # Methods specific to `car`
# => [:name, :wheels]

car.singleton_methods
# => []  # No singleton methods defined yet

# Let's define a singleton method `wheels` specifically for `car` and observe the effect
def car.wheels
  4
end

car.wheels
# => 4

car.singleton_methods
# => [:wheels] # Singleton method `wheels` is now defined for `car`

# Let's verify if the behavior of `wheels` is specific to `car` or affects the `Vehicle` class

bike = Vehicle.new "bike"
# => #<Vehicle:0x00007f0849592ba0 @name="bike">

bike.wheels
# => nil

{% endhighlight %}

Whenever `car.wheels` is called, Ruby's method lookup prioritizes the wheels method in the car's singleton class, as it
takes precedence over methods defined in the object's main(Vehicle) class. Method lookup is another fascinating topic in
Ruby worth exploring further.

One more thing that took me by surprise: what we commonly refer to as class methods are actually singleton methods
defined on the class's singleton class! 😲

{% highlight ruby %}

Vehicle.public_methods(false)
# => [:yaml_tag, :allocate, :attached_object, :json_creatable?, :superclass, :subclasses, :new]

Vehicle.singleton_methods
# => [:yaml_tag]

# Let's add a class method `automobile?` to the `Vehicle` class
class Vehicle
  def self.automobile?
    true
  end
end

Vehicle.singleton_methods
# => [:automobile?, :yaml_tag]  # `automobile?` is now a singleton method of `Vehicle`

{% endhighlight %}

In this case, `automobile?` isn’t a method defined in the `Vehicle` class but a singleton method attached to the `Vehicle`
class itself.

> Class methods are not actually class methods; they are instance methods of the class's singleton class.

More discoveries await, let’s dive deeper 🤞
