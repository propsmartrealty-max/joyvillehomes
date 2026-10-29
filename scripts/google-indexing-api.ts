/**
 * Sovereign Google Indexing API Bridge - Enterprise Edition
 * Bridges to the unified Enterprise Google Indexing & Discovery Pipeline.
 */
import { runEnterpriseIndexing } from './enterprise-google-indexing';

async function main() {
    await runEnterpriseIndexing();
}

main().catch((err) => {
    console.error('Fatal Google Indexing Error:', err);
    process.exit(1);
});
