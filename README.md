## Tech Stack

**Environment:** 

Requires `npm` installed.
As for running on iOS, please also install Xcode.


## Quick start

Clone the repo
```bash
  git clone https://github.com/yhch3n/expense-tracker.git
```

Install Waletty with npm

```bash
  cd Waletty
  npm install
```

    
## Run Locally

-  run locally on iOS, run the following command

```bash
  # Please skip this step if you already installed cocoapods.
  sudo gem install cocoapods
  
  cd ios
  pod install
  
  # Link asset
  npx react-native-asset
  
  # Run on iOS simulator
  npx react-native run-ios
```
You could also open Wallety.xcworkspace and run the app on your iPhone. Please make sure you sign the app in your own team.



-  run locally on Android, run the following command

```bash
  npx react-native run-android
```


## Original Author

- [@blaiti](https://github.com/blaiti)


## License

[MIT](https://github.com/blaiti/Wallety/blob/main/LICENSE)

