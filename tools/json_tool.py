'''
json_tool.py - Check and aggregate huge JSON files, prepare for
usage in "Interfaces"
'''

import json
import argparse


def read_json(args):
    with open(args.path, 'r') as json_file:
        res = json.load(json_file)
    return res


def check_json(args, data):
    '''
    Data plausibility check and information output
    '''

    print(f'Checking JSON file {args.path}')

    print()
    print(f'Data has {len(data.keys())} keys:')
    print(' ,'.join(data.keys()))

    print()
    print('Bone list ...')
    bone_list = data.get('bone_list', [])
    bones = len(bone_list)
    print(f'Got {bones} bones')

    print()
    print('Joint names ...')
    joint_names = data.get('joint_names', [])
    joints = len(joint_names)
    print(f'Got {joints} joints')
    print(joint_names)

    print()
    print('Frames ...')
    frames = data.get('frames', [])
    frames_count = len(frames)
    print(f'Got {frames_count} frames')

    jos = 0
    jps = 0

    for frame in frames:
        frame_id = frame['frame_id']
        bodies = frame.get('bodies', [])
        for body in bodies:
            if body['body_id'] != 1:
                print(f'SECOND body found wtf? Frame: {frame_id}')
                continue
            joint_orientations = body.get('joint_orientations', [])
            body_jos = len(joint_orientations)

            joint_positions = body.get('joint_positions', [])
            body_jps = len(joint_positions)

            if jos != body_jos:
                print(f'Joint orientations count has changed to {body_jos} in frame {frame_id}')
                jos = body_jos

            if jps != body_jps:
                print(f'Joint position count has changed to {body_jps} in frame {frame_id}')
                jps = body_jps


def get_joint_positions(args, data):
    '''
    Fetch position array of one key from joint_names
    '''

    key = args.joint_name

    joint_names = data.get('joint_names', [])
    assert key in joint_names, f'Invalid key {key}'

    joint_index = joint_names.index(key)
    print(f'Got joint index: {joint_index}')
    frames = data.get('frames', [])

    print(len(frames))

    res = []

    for frame in frames:
        bodies = frame.get('bodies', [])

        if not bodies:
            # frame_id = frame['frame_id']
            # print(f'EMPTY FRAME: {frame_id}. Will append null coordinates')
            res.append([None, None, None])

        for body in bodies:

            if body['body_id'] != 1:
                print('SKIPPING BODY')
                continue

            joint_positions = body['joint_positions'][joint_index]
            res.append(joint_positions)

    return res


def main(args):
    full_json = read_json(args)

    if args.mode == 'info':
        check_json(args, full_json)
        return

    if args.mode == 'positions':
        positions = get_joint_positions(args, full_json)
        if args.output == 'stdout':
            print(positions)
        if args.output == 'file':
            with open('output.json', 'w') as output_file:
                res = {
                    'input_file': args.path,
                    'joint_name': args.joint_name,
                    'frame_count': len(positions),
                    'positions': positions,
                }
                json.dump(res, output_file)
        return


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Tool to compute huge JSON files for INTERFACES')
    parser.add_argument('path', help="path to JSON file to be checked")
    parser.add_argument('mode', help="Mode", choices=['info', 'positions'])
    parser.add_argument('-j', '--joint-name', help="joint name to fetch", default='HAND_LEFT')
    parser.add_argument('-o', '--output', help="output format", choices=['file', 'stdout'], default='stdout')

    args = parser.parse_args()

    main(args)

    print('DONE')
