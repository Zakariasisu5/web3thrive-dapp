// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

/** @notice Profile Management Contract
@dev Stores basic profile metadata and off-chain IPFS URIs
*/

contract ProfileManager{
    struct Profile {
        string name;
        string role;
        string metadataURI; // IPFS Link
        bool exists;
    }


    // stores user address mapped to their profile
    mapping(address => Profile) public profiles;

    // events
    event ProfileRegistered(address indexed user, string name, string role, string uri);
    event ProfileUpdated(address indexed user, string uri);

    // errors
    error UserAlreadyExist();
    error ProfileDoesNotExist();

    // modifiers
    modifier onlyNewUser(){
        if(profiles[msg.sender].exists){
            revert UserAlreadyExist();
        }
        _;
    }

    modifier existingUsersOnly(){
        if(!profiles[msg.sender].exists){
            revert ProfileDoesNotExist();
        }

        _;
    }


    // functions
    function registerProfile(string memory _name, string memory _role, string memory _uri)  external onlyNewUser{
        profiles[msg.sender] = Profile(_name, _role, _uri, true);
        emit ProfileRegistered(msg.sender, _name, _role, _uri);
    }

    function updateProfileURI(string memory _uri) external existingUsersOnly{
        profiles[msg.sender].metadataURI = _uri;
        emit ProfileUpdated(msg.sender, _uri);
    }

}