# Interfaces_POCs

Small code pieces showing how "Interfaces" might work

## First example - index.html

Feed motion capturing data into some very simple p5 sketches and run captured video in "parallel".

Run premade example simply be opening `index.html` locally in your browser of trust.

One sentence about "parallel": It is NOT possible to sync a video being played frame-perfectly
with the p5 sketch and fetching the correct frame data in particular. Expect imperfections
increasing during video runtime.

### Setup

In `assets/data/output_01.json` you'll find the output of a motion capture recording done with https://github.com/microsoft/Azure-Kinect-Samples/tree/master/body-tracking-samples/offline_processor

This can be further processed using `tools/json_tool.py`. Start with `info` mode to check the file and its content:

```fish
$python tools/json_tool.py assets/data/output_01.json info

Checking JSON file assets/data/output_01.json

Data has 5 keys:
bone_list ,frames ,joint_names ,k4abt_sdk_version ,source_file

Bone list ...
Got 31 bones

Joint names ...
Got 32 joints
['PELVIS', 'SPINE_NAVEL', 'SPINE_CHEST', 'NECK', 'CLAVICLE_LEFT', 'SHOULDER_LEFT',
'ELBOW_LEFT', 'WRIST_LEFT', 'HAND_LEFT', 'HANDTIP_LEFT', 'THUMB_LEFT', 'CLAVICLE_RIGHT',
'SHOULDER_RIGHT', 'ELBOW_RIGHT', 'WRIST_RIGHT', 'HAND_RIGHT', 'HANDTIP_RIGHT',
'THUMB_RIGHT', 'HIP_LEFT', 'KNEE_LEFT', 'ANKLE_LEFT', 'FOOT_LEFT', 'HIP_RIGHT',
'KNEE_RIGHT', 'ANKLE_RIGHT', 'FOOT_RIGHT', 'HEAD', 'NOSE', 'EYE_LEFT', 'EAR_LEFT',
'EYE_RIGHT', 'EAR_RIGHT']

Frames ...
Got 1800 frames
Joint orientations count has changed to 32 in frame 0
Joint position count has changed to 32 in frame 0

DONE
```

Now we can pick one joint name ( e.g. `HEAD` ) and extract its data set from the file:

```
$python tools/json_tool.py assets/data/output_01.json positions -j HAND_RIGHT -o file
```

This will create a file, `output.json`. This can then be used in the website in a quite hacky
way ( later we'll have a backend providing a nice API to fetch data ): Rename it to `data.js` and
add the following in the beginning of the file: `var DATA =`. This bascially declares our
extracted JSON data as variable `DATA` in the websites javascript code, found in `custom.js`.

This POC shows that JSON motion capturing data can be handled very easily in both backend and
frontend. Maybe JSON should be the preferred output format of the motion capturing systems we
have in mind? Transforming data into JSON will be a task for the backend anyway i guess, but
receiving JSON directly will probably be easier and faster.

## Second example - index_tf_live.html

Live motion capturing via tensorflow-js and pose-detection package.

Run premade example simply be opening `index_tf_live.html` locally in your browser of trust and allow camera usage.
Add `?model=blazepose` to the URL in your browser as the alert message tells you to. Check documentation links
below for other models available.

This example show that cheap motion capturing can be done ai-driven in the brwoser! One model available,
`blazepose` is even capable of calculating z-axis information, allowing 3D rendering of these skeletons.
This might be a very nice addition to be used in computer art later down the road, but the precision
and plausibility of such data is yet to be tested in the field.

This app could be modified to either create JSON file from poses captured OR upload such data directly
to a backend server.

Great potencial to beat other local ai-driven motion capturing systems due to the simple fact it
needs no installation at all.

### Setup

Following the demo guide will yield a `dist` folder containing the "compiled" application to be
plugged in elsewhere. This was done in this repository, the main file plugged in was `tflw-pose-detection.js`.

A few hacks later ( see commits ) the pose data created are available for usage in p5js. Mission accomplished!

### Links

- https://github.com/tensorflow/tfjs-models
- https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/demos#live-camera-demo
- https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/blazepose_tfjs
