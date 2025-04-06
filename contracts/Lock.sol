// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    uint public candidateCount;

    struct Candidate {
        uint id;
        string name;
        string party;
        string manifesto;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    event CandidateAdded(uint indexed id, string name, string party);
    event Voted(address indexed voter, uint indexed candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier validCandidate(uint _candidateId) {
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory _name, string memory _party, string memory _manifesto) external onlyAdmin {
        candidateCount++;
        candidates[candidateCount] = Candidate({
            id: candidateCount,
            name: _name,
            party: _party,
            manifesto: _manifesto,
            voteCount: 0
        });

        emit CandidateAdded(candidateCount, _name, _party);
    }

    function vote(uint _candidateId) external validCandidate(_candidateId) {
        require(!hasVoted[msg.sender], "You have already voted");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, _candidateId);
    }

    function getCandidate(uint _candidateId) external view validCandidate(_candidateId) returns (
        uint id,
        string memory name,
        string memory party,
        string memory manifesto,
        uint voteCount
    ) {
        Candidate memory c = candidates[_candidateId];
        return (c.id, c.name, c.party, c.manifesto, c.voteCount);
    }

    function getAllCandidates() external view returns (Candidate[] memory) {
        Candidate[] memory list = new Candidate[](candidateCount);
        for (uint i = 0; i < candidateCount; i++) {
            list[i] = candidates[i + 1];
        }
        return list;
    }

    function getCandidateCount() external view returns (uint) {
        return candidateCount;
    }

    function checkIfVoted(address _user) external view returns (bool) {
        return hasVoted[_user];
    }
}
