# Interfaces_POCs

Small code pieces showing how "Interfaces" might work

## First example - index.html

Feed motion capturing data into some very simple p5 sketches and run captured video in "parallel".

Run premade example simply be opening `index.html` locally in your browser of trust.

One sentence about "parallel": It is NOT possible to sync a video being played frame-perfectly
with the p5 sketch and fetching the correct frame data in particular. Expect imperfections
increasing during video runtime.

### Setup

In `assets/data/output_01.json` you'll find the output of a motion capture recording done with XYZ ( @7pc : plz help here! )

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

Toolchain exaplanation TBD, cooking this into static page via `yarn` was quite tedious. Fechting the pose data into p5js is done in a similar hacky way to the first example, this example can be improved to be a full-flesehd motion capturing recorder.

Links:

- https://github.com/tensorflow/tfjs-models
- https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/demos#live-camera-demo
