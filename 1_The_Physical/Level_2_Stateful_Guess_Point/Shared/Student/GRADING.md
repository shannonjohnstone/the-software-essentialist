# Grading rubric

- [ ] I have a student object which can only be created using a static factory method
- [ ] The return type for the static factory method is strict, returning either a Student or a strictly typed error if it fails to create
- [ ] The student's properties are Value Objects 
- [ ] The student's properties cannot be changed directly
- [ ] The student's properties cannot be changed directly
- [ ] When I updateFirstName or updateLastName, the student object saves an event to an events list - this is how we can tell how the object has changed.
- [ ] It is virtually impossible to change the state of the Student object in a way where we'd leave it in an invalid state.
- [ ] The entire state of the object lives in a single (props: StudentProps) object. This property can only be updated via updateFirstName or updateLastName, and when that happens, it is validated correctly.
- [ ] There are no duplicated instances of validation logic anywhere. Everything is in its rightful place.