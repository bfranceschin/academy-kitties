pragma solidity ^0.5.0;

interface IERC721Receiver {
    function onERC721Received (address _operator, address from, uint256 tokenId, bytes calldata data) external returns (bytes4);
}