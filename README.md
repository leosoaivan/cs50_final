Magic 8 Ball

This final project represents the culmination of CS50 and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project is a mini-social network that centers around the UI-less Magic 8 Ball. It is a homage to a dingy website I used to frequent in college&mdash;the name of which I have completely forgotten&mdash;that allowed users to anonymously pose questions, to which they would received Magic 8 Ball answers. The Q/A would then be anonymously posted to a public feed for everyone's enjoyment.

![](/public/README.png)

## Video demo
https://youtu.be/0V2tGqZAJK8

## Live app
https://cs50-final-magic-8-ball.web.app/

## Tech
1. [Create React App](https://github.com/facebook/create-react-app) - Create React apps with minimal configuration
2. [React95](https://react95.io/) - UI components
3. [styled-components](https://styled-components.com/) - UI styling
4. [Firebase](https://firebase.google.com/) - Authentication, database, and hosting

## Features
1. A user can create an account via email/password or Google. An email address can be used only once, regardless of authentication type.
2. A password user can reset their password.
3. On their Dashboard page, a user can ask a question and receive a randomly-picked, standard Magic 8 Ball answer. This is limited to the 10 most recent entries.
4. On the Forum page, a user can view questions and answers from all users, limited to the 10 most recent entries.
5. On the Setting page, a user can delete their account completely. Their entries are not deleted, but their initials are removed.

## Potential features:
- Give users the ability to "like" a Q/A entry on the Forum Page.
- Give users the ability to "flag" a Q/A entry on the Forum Page.
- Give users the ability to paginate through entries.
- Create an admin panel to help with moderation of Forum Page.
- Give password users the ability to change their password.


## Contributing
1. Fork it
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
